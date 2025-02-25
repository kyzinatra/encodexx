import { TSchema } from "../../serializer/index.type";
import { OPTIONAL_SYMBOL, TCustomType, TYPE_SYMBOL } from "../custom-type";
import { or } from "./or";
import { undef } from "./undef";

export type TOptionalSchema<T extends TSchema = TSchema> = {
	data: T;
	[OPTIONAL_SYMBOL]: true;
};

type TOptionalType<T extends TCustomType | TSchema> = T extends TCustomType<infer R>
	? TCustomType<R | undefined>
	: TOptionalSchema<T>;
export function optional<T extends TCustomType | TSchema>(type: T): TOptionalType<T> {
	if (TYPE_SYMBOL in type) {
		return or(type, undef) as TOptionalType<T>;
	}

	return {
		data: type,
		[OPTIONAL_SYMBOL]: true,
	} as TOptionalType<T>;
}
