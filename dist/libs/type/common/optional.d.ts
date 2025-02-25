import { TConvertValueToType, TSchema } from "../../serializer/index.type";
export declare function optional<T extends TSchema>(type: T): import("../custom-type").TCustomType<TConvertValueToType<T> | undefined>;
