import { Serializer } from "../../serializer";
import { TArraysTypes, TConvertValueToType, TSchema, TSchemaObject } from "../../serializer/index.type";
import { customType, TCustomType } from "../custom-type";

export function schema<T extends TSchemaObject | TArraysTypes>(type: T, discriminateBy?: string | number) {
	const serializer = new Serializer(type, { resetCursor: false });

	const field = discriminateBy && (type[discriminateBy as keyof typeof type] as TSchema);
	const guardSerializer = field ? new Serializer(field, { resetCursor: false }) : null;

	return customType<TConvertValueToType<T>>({
		decode: (buff) => serializer.decode(buff),
		encode: (val, buff) => serializer.encode(val, buff),
		guard: (val): val is TConvertValueToType<T> => {
			if (guardSerializer && discriminateBy)
				return guardSerializer.guard(val?.[discriminateBy as keyof typeof val]);

			return serializer.guard(val);
		},
		name: `Schema<${serializer.name}>`,
	});
}
