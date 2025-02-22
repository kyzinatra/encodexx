import { Buffer } from "../buffer";
import { TConvertSchemaToType, TSchema, TSchemaObject, TSerializerOptions } from "./index.type";
export declare class Serializer<T extends TSchemaObject> {
    private type;
    private options?;
    private compiledSchema;
    constructor(type: T, options?: TSerializerOptions | undefined);
    private static isCustomType;
    private compileSchema;
    decode(buff: Buffer): TConvertSchemaToType<T>;
    encode(obj: TConvertSchemaToType<T>, buff?: Buffer): Buffer;
    static equal(schema1: TSchema, schema2: TSchema): boolean;
}
