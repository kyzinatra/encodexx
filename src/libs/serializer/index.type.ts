import { TCustomType } from "../type/custom-type";
import { Buffer } from "../buffer";

export type TSchema = TCustomType | TSchemaObject | TArraysTypes;

export type TStringifiedSchema<K extends TSchemaObject | TArraysTypes | TCustomType> = K extends TSchemaObject
	? {
			[key in keyof K]: TStringifiedSchema<K[key]>;
	  }
	: K extends TArraysTypes
	? [TStringifiedSchema<K[number]>]
	: string;

export type TArraysTypes = [TSchemaObject] | [TCustomType] | [TArraysTypes];

export type TSchemaObject = {
	[key in string]: TCustomType | TSchemaObject | TArraysTypes;
};

type TConvertValueToType<K extends TSchemaObject | TArraysTypes | TCustomType> = K extends TSchemaObject
	? TConvertSchemaToType<K>
	: K extends TArraysTypes
	? TConvertValueToType<K[number]>[]
	: K extends TCustomType<infer CT>
	? CT
	: never;

export type TConvertSchemaToType<T extends TSchemaObject> = {
	[key in keyof T]: TConvertValueToType<T[key]>;
};

export type TCompiledSchema<T = any> = {
	encode(buff: Buffer, obj: T): void;
	decode(buff: Buffer): T;
	stringify(): TStringifiedSchema<any>;
};

export type TSerializerOptions = {
	strict?: boolean;
};
