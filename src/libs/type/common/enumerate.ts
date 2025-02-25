import { TypeMatchError } from "../../error/type-match";
import { customType } from "../custom-type";

export function enumerate<T extends string[]>(...strs: T) {
	if (strs.length > 65_535) throw new Error("Max enumeration items length is 64535");

	return customType({
		decode(buffer): T[number] {
			return strs[buffer.readUint16()];
		},
		encode(value, buffer) {
			const index = strs.indexOf(value);
			if (index === -1) throw new TypeMatchError(`Enum doesn't contain ${value}`);
			buffer.writeUint16(index);
		},
		guard(data): data is T[number] {
			return strs.includes(String(data));
		},
		name: `Enum<${strs.join("|")}>`,
	});
}
