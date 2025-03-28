import { DataBuffer } from "../../buffer";

export const TYPE_SYMBOL = Symbol("custom-type-symbol");

export type TCustomType<K = any> = {
	readonly name: string;
	decode: (buffer: DataBuffer) => K;
	encode: (value: K, buffer: DataBuffer) => unknown;
	guard: (data: unknown) => data is K;
	[TYPE_SYMBOL]: boolean;
};

export function customType<T = any>(t: Omit<TCustomType<T>, typeof TYPE_SYMBOL>): TCustomType<T> {
	return { ...t, [TYPE_SYMBOL]: true };
}
