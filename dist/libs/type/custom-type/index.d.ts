import { DataBuffer } from "../../buffer";
export declare const TYPE_SYMBOL: unique symbol;
export type TCustomType<K = any> = {
    readonly name: string;
    decode: (buffer: DataBuffer) => K;
    encode: (value: K, buffer: DataBuffer) => unknown;
    guard: (data: unknown) => data is K;
    [TYPE_SYMBOL]: boolean;
};
export declare function customType<T = any>(t: Omit<TCustomType<T>, typeof TYPE_SYMBOL>): TCustomType<T>;
