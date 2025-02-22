import { TCustomType, customType } from "../custom-type";

type ExtractCustomType<T extends TCustomType> = T extends TCustomType<infer R> ? R : never;

export function or<T extends TCustomType[]>(...types: T) {
	if (types.length > 255) throw new Error("Too many types provided: Maximum allowed is 255");

	return customType({
		decode(buff): ExtractCustomType<T[number]> {
			const index = buff.readUint8();
			return types[index].decode(buff);
		},
		encode(buffer, val) {
			const typeIndex = types.findIndex((el) => el.guard(val));
			if (typeIndex === -1) throw new Error("No matching type found among the provided types");
			buffer.writeUint8(typeIndex);
			types[typeIndex].encode(buffer, val);
		},
		guard(data): data is ExtractCustomType<T[number]> {
			return types.some((el) => el.guard(data));
		},
		name: `Or<${types.map((el) => el.name).join("|")}>`,
	});
}
