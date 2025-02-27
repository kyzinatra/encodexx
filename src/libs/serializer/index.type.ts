import { TCustomType } from "../type/custom-type";
import { DataBuffer } from "../buffer";

export type TSchema = TCustomType | TSchemaObject | TArraysTypes;

export type TArraysTypes = [TSchemaObject] | [TCustomType] | [TArraysTypes];

export type TSchemaObject = {
	[key in string]: TCustomType | TSchemaObject | TArraysTypes;
};

export type TConvertValueToType<K extends TSchema> = K extends TSchemaObject
	? TConvertSchemaToType<K>
	: K extends TArraysTypes
	? TConvertValueToType<K[number]>[]
	: K extends TCustomType<infer CT>
	? CT
	: never;

export type TConvertSchemaToType<T extends TSchemaObject> = {
	// strict fields
	[key in keyof T as undefined extends TConvertValueToType<T[key]> ? never : key]: TConvertValueToType<
		T[key]
	>;
} & {
	// optional fields
	[key in keyof T as undefined extends TConvertValueToType<T[key]> ? key : never]?: Exclude<
		TConvertValueToType<T[key]>,
		undefined
	>;
};

export type TCompiledSchema<T = any> = {
	encode(obj: T, buff: DataBuffer): void;
	decode(buff: DataBuffer): T;
	guard(val: unknown): val is T;
};

export type TSerializerOptions = {
	strict?: boolean;
	version?: string;
	resetCursor?: boolean;
};
