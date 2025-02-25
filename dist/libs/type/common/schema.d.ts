import { TArraysTypes, TConvertValueToType, TSchemaObject } from "../../serializer/index.type";
import { TCustomType } from "../custom-type";
export declare function schema<T extends TSchemaObject | TArraysTypes>(type: T, discriminateBy?: string | number): TCustomType<TConvertValueToType<T>>;
