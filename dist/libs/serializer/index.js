"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializer = void 0;
const buffer_1 = require("../buffer");
const outdated_1 = require("../error/outdated");
const type_match_1 = require("../error/type-match");
const custom_type_1 = require("../type/custom-type");
const textEncoder = new TextEncoder();
class Serializer {
    constructor(type, options = {}) {
        this.options = options;
        this._name = 0;
        this.options.resetCursor = options?.resetCursor !== false;
        this.compiledSchema = this.compileSchema(type, options?.strict);
    }
    static isCustomType(type) {
        return !!(typeof type === "object" && type && custom_type_1.TYPE_SYMBOL in type);
    }
    compileSchema(schema, strict) {
        if (Serializer.isCustomType(schema)) {
            this.name = schema.name;
            return {
                decode: (buff) => schema.decode(buff),
                //? I don't wanna run if (strict) condition every time so made 2 functions
                encode: strict
                    ? (obj, buff) => {
                        if (!schema.guard(obj)) {
                            throw new type_match_1.TypeMatchError(`schema ${schema.name} doesn't match ${obj}`);
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
                encode: (arr, buff) => {
                    if (strict && !Array.isArray(arr)) {
                        throw new type_match_1.TypeMatchError(`array schema doesn't match ${arr}`);
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
                guard(val) {
                    if (!Array.isArray(val)) {
                        return false;
                    }
                    const len = val.length;
                    for (let i = 0; i < len; i++) {
                        if (!compiledItem.guard(val[i]))
                            return false;
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
            encode(obj, buff) {
                for (let i = 0; i < entries.length; i++) {
                    const { key, encode } = entries[i];
                    encode(obj[key], buff);
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
            guard(val) {
                if (!val || typeof val !== "object")
                    return false;
                for (let i = 0; i < entries.length; i++) {
                    const { key, guard } = entries[i];
                    if (!guard(val[key]))
                        return false;
                }
                return true;
            },
        };
    }
    decode(buff) {
        // transforms
        if (buff instanceof ArrayBuffer)
            buff = new buffer_1.DataBuffer(buff);
        if (buff instanceof Uint8Array)
            buff = new buffer_1.DataBuffer(buff.buffer.slice(buff.byteOffset, buff.byteOffset + buff.byteLength));
        if (this.options?.resetCursor)
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
            buff = new buffer_1.DataBuffer();
        else if (this.options?.resetCursor)
            buff.resetCursor();
        if (this.options?.version) {
            buff.writeString(this.options.version);
        }
        this.compiledSchema.encode(obj, buff);
        return buff;
    }
    guard(val) {
        return this.compiledSchema.guard(val);
    }
    get name() {
        return String(this._name);
    }
    set name(s) {
        this._name = (this._name + textEncoder.encode(s).reduce((a, l) => a + l)) % (1 << 30);
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
                const keys1 = Object.keys(el1).sort();
                const keys2 = Object.keys(el2).sort();
                for (const key of keys1) {
                    stack1.push(el1[key]);
                }
                for (const key of keys2) {
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
