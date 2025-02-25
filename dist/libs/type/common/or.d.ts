import { TCustomType } from "../custom-type";
type ExtractValueType<T extends TCustomType> = T extends TCustomType<infer R> ? R : never;
export declare function or<T extends TCustomType[]>(...types: T): TCustomType<ExtractValueType<T[number]>>;
export {};
