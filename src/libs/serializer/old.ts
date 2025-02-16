import { parseName } from "../../utils/parse-name";
import { Buffer } from "../buffer";
import { TypeMatchError } from "../error/type-match";
import { TCustomType, TYPE_SYMBOL } from "../type/custom-type";
import { TArraysTypes, TConvertSchemeToType, TSchemeObject } from "./index.type";

export class Serializer<T extends TSchemeObject> {
	constructor(private type: T) {}

	parse() {}
	stringify() {}

	decode(buff: Buffer) {
		buff.resetCursor();
		return this._decode(buff);
	}

	private _decode(
		buff: Buffer,
		schema: TSchemeObject | TArraysTypes | TCustomType = this.type,
		result: TConvertSchemeToType<any> = {}
	): TConvertSchemeToType<T> {
		//? If this is a composite type
		if (typeof schema === "object" && !(TYPE_SYMBOL in schema)) {
			//? If this is an array. For example [[str]]
			if (Array.isArray(schema)) {
				const len = buff.readUint32();
				const arrRes = new Array(len);
				for (let i = 0; i < len; i++) {
					arrRes[i] = this._decode(buff, schema[0]);
				}
				// @ts-expect-error The array will not be returned to the user but will be assigned to result[key]
				return arrRes;
			} else {
				//? If this is a schema object {...}
				for (let key in schema) {
					result[key] = this._decode(buff, schema[key]);
				}
			}
		} else {
			//? If this is a simple type
			return schema.decode(buff);
		}
		return result as TConvertSchemeToType<T>;
	}

	encode(obj: TConvertSchemeToType<T>, strict: boolean = false) {
		return this._encode(obj, strict);
	}
	private _encode(
		obj: TConvertSchemeToType<T>,
		strict?: boolean,
		schema: TSchemeObject | TArraysTypes | TCustomType = this.type,
		buff?: Buffer
	): Buffer {
		if (!buff) {
			buff = new Buffer();
		}
		//? If this is a composite type
		if (typeof schema === "object" && !(TYPE_SYMBOL in schema)) {
			//? If this is an array. For example [[str]]
			if (Array.isArray(schema)) {
				if (!Array.isArray(obj)) throw new TypeMatchError();

				buff.writeUint32(obj.length);
				for (let i = 0; i < obj.length; i++) {
					this._encode(obj[i], strict, schema[0], buff);
				}
			} else {
				//? If this is a schema object {...}
				for (let key in schema) {
					this._encode(obj[key], strict, schema[key], buff);
				}
			}
		} else {
			if (strict && !schema.equal(obj))
				throw new TypeMatchError(`schema ${parseName(schema.name)} doesn't match ${obj}`);
			//? If this is a simple type
			schema.encode(buff, obj);
		}
		return buff;
	}

	equal() {}
	shallowEqual() {}
	getParsedScheme() {}
}
