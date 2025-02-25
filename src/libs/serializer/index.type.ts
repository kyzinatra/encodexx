import { TCustomType } from "../type/custom-type";
import { Buffer } from "../buffer";
import { TOptionalSchema } from "../type/common/optional";

export type TSchema = TCustomType | TSchemaObject | TArraysTypes;

export type TArraysTypes = [TSchemaObject] | [TCustomType] | [TArraysTypes];

export type TSchemaObject = {
	[key in string]: TCustomType | TSchemaObject | TArraysTypes;
};

export type TConvertValueToType<K extends TSchema> = K extends TOptionalSchema<infer OT>
	? TConvertValueToType<OT> | undefined
	: K extends TSchemaObject
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
	encode(buff: Buffer, obj: T): void;
	decode(buff: Buffer): T;
};

export type TSerializerOptions = {
	strict?: boolean;
	version?: string;
};
