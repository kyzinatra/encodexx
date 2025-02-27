import { DataBuffer } from "../buffer";
import { TConvertValueToType, TSchema, TSerializerOptions } from "./index.type";
export declare class Serializer<T extends TSchema> {
    private options;
    private compiledSchema;
    constructor(type: T, options?: TSerializerOptions);
    private static isCustomType;
    private compileSchema;
    decode(buff: DataBuffer | ArrayBuffer | Uint8Array): TConvertValueToType<T>;
    encode(obj: TConvertValueToType<T>, buff?: DataBuffer): DataBuffer;
    guard(val: unknown): val is TConvertValueToType<T>;
    private _name;
    get name(): string;
    private set name(value);
    static equal(schema1: TSchema, schema2: TSchema): boolean;
}
