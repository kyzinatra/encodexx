import { customType } from "../custom-type";

export const uleb128 = customType({
	decode(buff) {
		return buff.readUleb128();
	},
	encode(buffer, val) {
		buffer.writeUleb128(val);
	},
	guard(data): data is bigint {
		return typeof data === "bigint" && data >= 0n;
	},
	name: "uleb128",
});
