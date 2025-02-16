import { TCustomType } from "../type/custom-type";

export type TArraysTypes = [TSchemeObject] | [TCustomType] | [TArraysTypes];

export type TSchemeObject = {
	[key in string]: TCustomType | TSchemeObject | TArraysTypes;
};

type TConvertValueToType<K extends TSchemeObject | TArraysTypes | TCustomType> = K extends TSchemeObject
	? TConvertSchemeToType<K>
	: K extends TArraysTypes
	? TConvertValueToType<K[number]>[]
	: K extends TCustomType<infer CT>
	? CT
	: never;

export type TConvertSchemeToType<T extends TSchemeObject> = {
	[key in keyof T]: TConvertValueToType<T[key]>;
};
