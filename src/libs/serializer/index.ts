import { Buffer } from "../buffer";
import { OutdatedError } from "../error/outdated";
import { TypeMatchError } from "../error/type-match";
import { t } from "../type/common";
import { TCustomType, TYPE_SYMBOL } from "../type/custom-type";
import {
	TArraysTypes,
	TCompiledSchema,
	TConvertSchemaToType,
	TSchemaObject,
	TSerializerOptions,
} from "./index.type";

export class Serializer<T extends TSchemaObject> {
	private compiledSchema: TCompiledSchema<TConvertSchemaToType<T>>;

	constructor(private type: T, private options?: TSerializerOptions) {
		this.compiledSchema = this.compileSchema(type, options?.strict);
	}

	private isCustomType(type: unknown): type is TCustomType {
		return !!(typeof type === "object" && type && TYPE_SYMBOL in type);
	}
	private compileSchema(
		schema: TSchemaObject | TArraysTypes | TCustomType,
		strict?: boolean
	): TCompiledSchema {
		if (this.isCustomType(schema)) {
			return {
				decode: (buff) => schema.decode(buff),
				//? I don't wanna run if (strict) condition every time so made 2 types of functions
				encode: strict
					? (buff, obj) => {
							if (!schema.guard(obj)) {
								throw new TypeMatchError(`schema ${schema.name} doesn't match ${obj}`);
							}
							schema.encode(buff, obj);
					  }
					: (buff, obj) => schema.encode(buff, obj),
			};
		}

		if (Array.isArray(schema)) {
			const compiledItem = this.compileSchema(schema[0], strict);
			return {
				encode: strict
					? (buff, arr: any[]) => {
							if (strict && !Array.isArray(arr)) {
								throw new TypeMatchError(`array schema doesn't match ${arr}`);
							}
							const len = arr.length;
							buff.writeUint32(len);
							for (let i = 0; i < len; i++) {
								compiledItem.encode(buff, arr[i]);
							}
					  }
					: (buff, arr: any[]) => {
							const len = arr.length;
							buff.writeUint32(len);
							for (let i = 0; i < len; i++) {
								compiledItem.encode(buff, arr[i]);
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
			};
		}

		const entries = Object.keys(schema).map((key) => {
			const compiledChild = this.compileSchema(schema[key], strict);
			return {
				key,
				encode: compiledChild.encode,
				decode: compiledChild.decode,
			};
		});
		return {
			encode(buff, obj: Record<string, any>) {
				for (let i = 0; i < entries.length; i++) {
					const { key, encode } = entries[i];
					encode(buff, obj[key]);
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
		};
	}

	decode(buff: Buffer) {
		buff.resetCursor();

		if (this.options?.version) {
			const buffVersion = buff.readString();
			console.log(buffVersion, this.options);
			if (buffVersion !== this.options.version) throw new OutdatedError(buffVersion, this.options.version);
		}

		return this.compiledSchema.decode(buff);
	}

	encode(obj: TConvertSchemaToType<T>, buff?: Buffer) {
		if (!buff) buff = new Buffer();
		else buff.resetCursor();

		if (this.options?.version) {
			buff.writeString(this.options.version);
		}

		this.compiledSchema.encode(buff, obj);
		return buff;
	}

	static equal(schema1: TSchemaObject, schema2: TSchemaObject) {}
}
