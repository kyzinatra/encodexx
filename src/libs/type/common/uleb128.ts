import { customType } from "../custom-type";

export const uleb128 = customType<bigint>({
	decode(buff) {
		return buff.readUleb128();
	},
	encode(buffer, val) {
		buffer.writeUleb128(val);
	},
	equal(data): data is bigint {
		return typeof data === "bigint" && data >= 0n;
	},
	name: Symbol("uleb128"),
});
