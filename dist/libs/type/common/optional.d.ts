import { TSchema } from "../../serializer/index.type";
import { OPTIONAL_SYMBOL, TCustomType } from "../custom-type";
export type TOptionalSchema<T extends TSchema = TSchema> = {
    data: T;
    [OPTIONAL_SYMBOL]: true;
};
type TOptionalType<T extends TCustomType | TSchema> = T extends TCustomType<infer R> ? TCustomType<R | undefined> : TOptionalSchema<T>;
export declare function optional<T extends TCustomType | TSchema>(type: T): TOptionalType<T>;
export {};
