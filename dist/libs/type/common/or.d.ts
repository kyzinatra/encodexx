import { TCustomType } from "../custom-type";
type ExtractCustomType<T extends TCustomType> = T extends TCustomType<infer R> ? R : never;
export declare function or<T extends TCustomType[]>(...types: T): TCustomType<ExtractCustomType<T[number]>>;
export {};
