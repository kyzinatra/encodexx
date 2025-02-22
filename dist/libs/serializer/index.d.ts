import { Buffer } from "../buffer";
import { TConvertValueToType, TSchema, TSerializerOptions } from "./index.type";
export declare class Serializer<T extends TSchema> {
    private type;
    private options?;
    private compiledSchema;
    constructor(type: T, options?: TSerializerOptions | undefined);
    private static isCustomType;
    private compileSchema;
    decode(buff: Buffer): TConvertValueToType<T>;
    encode(obj: TConvertValueToType<T>, buff?: Buffer): Buffer;
    static equal(schema1: TSchema, schema2: TSchema): boolean;
}
