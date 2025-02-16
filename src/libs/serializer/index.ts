import { parseName } from "../../utils/parse-name";
import { Buffer } from "../buffer";
import { TypeMatchError } from "../error/type-match";
import { TCustomType, TYPE_SYMBOL } from "../type/custom-type";
import {
	TArraysTypes,
	TCompiledSchema,
	TConvertSchemaToType,
	TSchemaObject,
	TSerializerOptions,
	TStringifiedSchema,
} from "./index.type";

export class Serializer<T extends TSchemaObject> {
	private compiledSchema: TCompiledSchema<TConvertSchemaToType<T>>;

	constructor(type: T, options?: TSerializerOptions) {
		this.compiledSchema = this.compileSchema(type, options?.strict);
	}

	private isCustomType(type: unknown): type is TCustomType<any> {
		return !!(typeof type === "object" && type && TYPE_SYMBOL in type);
	}
	private compileSchema(
		schema: TSchemaObject | TArraysTypes | TCustomType,
		strict?: boolean
	): TCompiledSchema {
		if (this.isCustomType(schema)) {
			return {
				decode(buff) {
					return schema.decode(buff);
				},
				encode(buff, obj) {
					if (strict && !schema.equal(obj)) {
						throw new TypeMatchError(`schema ${parseName(schema.name)} doesn't match ${obj}`);
					}
					schema.encode(buff, obj);
				},
				stringify() {
					return parseName(schema.name);
				},
			};
		}
		if (Array.isArray(schema)) {
			const compiledItem = this.compileSchema(schema[0], strict);
			return {
				encode(buff, arr: any[]) {
					if (strict && !Array.isArray(arr)) {
						throw new TypeMatchError(`array schema doesn't match ${arr}`);
					}
					buff.writeUint32(arr.length);
					for (let i = 0; i < arr.length; i++) {
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
				stringify() {
					return [compiledItem.stringify()];
				},
			};
		}

		const entries = Object.entries(schema).map(([key, child]) => {
			const compiledChild = this.compileSchema(child, strict);
			return {
				key,
				encode: compiledChild.encode,
				decode: compiledChild.decode,
				stringify: compiledChild.stringify,
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
			stringify() {
				const obj: Record<string, any> = {};
				for (let i = 0; i < entries.length; i++) {
					obj[entries[i].key] = entries[i].stringify();
				}
				return obj;
			},
		};
	}

	decode(buff: Buffer) {
		buff.resetCursor();
		return this.compiledSchema.decode(buff);
	}

	encode(obj: TConvertSchemaToType<T>) {
		const buff = new Buffer();
		this.compiledSchema.encode(buff, obj);
		return buff;
	}

	parse() {}
	toJSON(): TStringifiedSchema<T> {
		return this.compiledSchema.stringify() as TStringifiedSchema<T>;
	}
	equal() {}
	shallowEqual() {}
	getParsedSchema() {}
}
