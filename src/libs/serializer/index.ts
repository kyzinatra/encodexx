import { Buffer } from "../buffer";
import { OutdatedError } from "../error/outdated";
import { TypeMatchError } from "../error/type-match";
import { TCustomType, TYPE_SYMBOL } from "../type/custom-type";
import { TCompiledSchema, TConvertValueToType, TSchema, TSerializerOptions } from "./index.type";

const textEncoder = new TextEncoder();
export class Serializer<T extends TSchema> {
	private compiledSchema: TCompiledSchema<TConvertValueToType<T>>;

	constructor(type: T, private options: TSerializerOptions = {}) {
		this.options.resetCursor = options?.resetCursor !== false;
		this.compiledSchema = this.compileSchema(type, options?.strict);
	}
	private static isCustomType(type: unknown): type is TCustomType {
		return !!(typeof type === "object" && type && TYPE_SYMBOL in type);
	}
	private compileSchema(schema: TSchema, strict?: boolean): TCompiledSchema {
		if (Serializer.isCustomType(schema)) {
			this.name = schema.name;
			return {
				decode: (buff) => schema.decode(buff),
				//? I don't wanna run if (strict) condition every time so made 2 functions
				encode: strict
					? (obj, buff) => {
							if (!schema.guard(obj)) {
								throw new TypeMatchError(`schema ${schema.name} doesn't match ${obj}`);
							}
							schema.encode(obj, buff);
					  }
					: (obj, buff) => {
							schema.encode(obj, buff);
					  },
				guard: (val) => schema.guard(val),
			};
		}

		if (Array.isArray(schema)) {
			const compiledItem = this.compileSchema(schema[0], strict);
			this.name = `arr`;
			return {
				encode: (arr: any[], buff) => {
					if (strict && !Array.isArray(arr)) {
						throw new TypeMatchError(`array schema doesn't match ${arr}`);
					}
					const len = arr.length;
					buff.writeUint32(len);
					for (let i = 0; i < len; i++) {
						compiledItem.encode(arr[i], buff);
					}
				},
				decode(buff) {
					const len = buff.readUint32();
					const result = new Array(len);
					for (let i = 0; i < len; i++) {
						result[i] = compiledItem.decode(buff);
					}
					return result;
				},
				guard(val): val is any {
					if (!Array.isArray(val)) {
						return false;
					}
					const len = val.length;
					for (let i = 0; i < len; i++) {
						if (!compiledItem.guard(val[i])) return false;
					}
					return true;
				},
			};
		}

		const entries = Object.keys(schema)
			.sort()
			.map((key) => {
				this.name = key;
				const compiledChild = this.compileSchema(schema[key], strict);
				return {
					key,
					encode: compiledChild.encode,
					decode: compiledChild.decode,
					guard: compiledChild.guard,
				};
			});

		return {
			encode(obj: Record<string, any>, buff) {
				for (let i = 0; i < entries.length; i++) {
					const { key, encode } = entries[i];

					encode(obj[key], buff);
				}
			},
			decode(buff) {
				const obj: Record<string, any> = {};
				for (let i = 0; i < entries.length; i++) {
					const { key, decode } = entries[i];
					obj[key] = decode(buff);
				}
				return obj;
			},
			guard(val): val is any {
				if (!val || typeof val !== "object") return false;
				for (let i = 0; i < entries.length; i++) {
					const { key, guard } = entries[i];
					if (!guard(val[key as keyof typeof val])) return false;
				}
				return true;
			},
		};
	}

	decode(buff: Buffer) {
		if (this.options?.resetCursor) buff.resetCursor();

		if (this.options?.version) {
			const buffVersion = buff.readString();
			if (buffVersion !== this.options.version) throw new OutdatedError(buffVersion, this.options.version);
		}

		return this.compiledSchema.decode(buff);
	}

	encode(obj: TConvertValueToType<T>, buff?: Buffer) {
		if (!buff) buff = new Buffer();
		else if (this.options?.resetCursor) buff.resetCursor();

		if (this.options?.version) {
			buff.writeString(this.options.version);
		}
		this.compiledSchema.encode(obj, buff);
		return buff;
	}

	guard(val: unknown): val is TConvertValueToType<T> {
		return this.compiledSchema.guard(val);
	}

	private _name = 0;
	get name() {
		return String(this._name);
	}
	private set name(s: string) {
		this._name = (this._name + textEncoder.encode(s).reduce((a, l) => a + l)) % (1 << 30);
	}
	static equal(schema1: TSchema, schema2: TSchema) {
		const stack1: TSchema[] = [schema1];
		const stack2: TSchema[] = [schema2];

		while (stack1.length) {
			const el1 = stack1.pop();
			const el2 = stack2.pop();
			if (el2 === undefined) return false;

			if (Serializer.isCustomType(el1) && Serializer.isCustomType(el2)) {
				if (el1.name !== el2.name) return false;
				continue;
			}

			if (Array.isArray(el1) && Array.isArray(el2)) {
				for (const item of el1) {
					stack1.push(item);
				}
				for (const item of el2) {
					stack2.push(item);
				}
				continue;
			}

			if (typeof el1 === "object" && typeof el2 === "object") {
				const keys1 = Object.keys(el1).sort();
				const keys2 = Object.keys(el2).sort();
				for (const key of keys1) {
					stack1.push(el1[key as keyof typeof el1]);
				}
				for (const key of keys2) {
					stack2.push(el2[key as keyof typeof el2]);
				}
				continue;
			}
			return false;
		}
		return stack2.length === 0;
	}
}
