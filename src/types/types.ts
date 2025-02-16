import { Serializer } from "../libs/serializer";
import { TCustomType } from "../libs/type/custom-type";

export type ArraySingle<T> = T extends Array<infer U>
	? [ArraySingle<U>]
	: T extends TCustomType
	? T
	: T extends (...args: any[]) => any
	? T
	: T extends object
	? { [K in keyof T]: ArraySingle<T[K]> }
	: T;

export type ExtractObj<T extends Serializer<any>> = T["encode"] extends (f: infer F, ...args: any[]) => any
	? F
	: never;
