import { parseName } from "../../../utils/parse-name";
import { TCustomType, customType } from "../custom-type";

type ExtractCustomType<T extends TCustomType> = T extends TCustomType<infer R> ? R : never;

export function or<T extends TCustomType[]>(...types: T) {
	if (types.length > 255) throw new Error("Too many types provided: Maximum allowed is 255");

	return customType<ExtractCustomType<T[number]>>({
		decode(buff) {
			const index = buff.readUint8();
			return types[index].decode(buff);
		},
		encode(buffer, val) {
			const typeIndex = types.findIndex((el) => el.equal(val));
			if (typeIndex === -1) throw new Error("No matching type found among the provided types");
			buffer.writeUint8(typeIndex);
			types[typeIndex].encode(buffer, val);
		},
		equal(data): data is ExtractCustomType<T[number]> {
			return types.some((el) => el.equal(data));
		},
		name: Symbol(`Or<${types.map((el) => parseName(el.name)).join("|")}>`),
	});
}
