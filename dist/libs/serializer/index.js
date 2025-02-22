"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializer = void 0;
const buffer_1 = require("../buffer");
const outdated_1 = require("../error/outdated");
const type_match_1 = require("../error/type-match");
const custom_type_1 = require("../type/custom-type");
class Serializer {
    constructor(type, options) {
        this.type = type;
        this.options = options;
        this.compiledSchema = this.compileSchema(type, options?.strict);
    }
    static isCustomType(type) {
        return !!(typeof type === "object" && type && custom_type_1.TYPE_SYMBOL in type);
    }
    compileSchema(schema, strict) {
        if (Serializer.isCustomType(schema)) {
            return {
                decode: (buff) => schema.decode(buff),
                //? I don't wanna run if (strict) condition every time so made 2 functions
                encode: strict
                    ? (buff, obj) => {
                        if (!schema.guard(obj)) {
                            throw new type_match_1.TypeMatchError(`schema ${schema.name} doesn't match ${obj}`);
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
                    ? (buff, arr) => {
                        if (strict && !Array.isArray(arr)) {
                            throw new type_match_1.TypeMatchError(`array schema doesn't match ${arr}`);
                        }
                        const len = arr.length;
                        buff.writeUint32(len);
                        for (let i = 0; i < len; i++) {
                            compiledItem.encode(buff, arr[i]);
                        }
                    }
                    : (buff, arr) => {
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
            encode(buff, obj) {
                for (let i = 0; i < entries.length; i++) {
                    const { key, encode } = entries[i];
                    encode(buff, obj[key]);
                }
            },
            decode(buff) {
                const obj = {};
                for (let i = 0; i < entries.length; i++) {
                    const { key, decode } = entries[i];
                    obj[key] = decode(buff);
                }
                return obj;
            },
        };
    }
    decode(buff) {
        buff.resetCursor();
        if (this.options?.version) {
            const buffVersion = buff.readString();
            if (buffVersion !== this.options.version)
                throw new outdated_1.OutdatedError(buffVersion, this.options.version);
        }
        return this.compiledSchema.decode(buff);
    }
    encode(obj, buff) {
        if (!buff)
            buff = new buffer_1.Buffer();
        else
            buff.resetCursor();
        if (this.options?.version) {
            buff.writeString(this.options.version);
        }
        this.compiledSchema.encode(buff, obj);
        return buff;
    }
    static equal(schema1, schema2) {
        const stack1 = [schema1];
        const stack2 = [schema2];
        while (stack1.length) {
            const el1 = stack1.pop();
            const el2 = stack2.pop();
            if (el2 === undefined)
                return false;
            if (Serializer.isCustomType(el1) && Serializer.isCustomType(el2)) {
                if (el1.name !== el2.name)
                    return false;
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
                for (const key in el1) {
                    stack1.push(el1[key]);
                }
                for (const key in el2) {
                    stack2.push(el2[key]);
                }
                continue;
            }
            return false;
        }
        return stack2.length === 0;
    }
}
exports.Serializer = Serializer;
