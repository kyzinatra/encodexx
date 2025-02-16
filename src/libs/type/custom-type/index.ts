import { Buffer } from "../../buffer";

export const TYPE_SYMBOL = Symbol("custom-type-symbol");

export type TCustomType<K = any> = {
	name: string | symbol;
	decode: (buffer: Buffer) => K;
	encode: (buffer: Buffer, value: K) => unknown;
	equal: (data: unknown) => data is K;
	[TYPE_SYMBOL]: boolean;
};

export function customType<T = any>(t: Omit<TCustomType<T>, typeof TYPE_SYMBOL>): TCustomType<T> {
	return { ...t, [TYPE_SYMBOL]: true };
}
