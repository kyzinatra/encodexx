import { TCustomType } from "../custom-type";
export declare function optional<T extends TCustomType>(type: T): TCustomType<(T extends TCustomType<infer R> ? R : never) | undefined>;
