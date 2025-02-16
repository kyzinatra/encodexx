import { customType } from "../custom-type";

export const sleb128 = customType<bigint>({
	decode(buff) {
		return buff.readSleb128();
	},
	encode(buffer, val) {
		buffer.writeSleb128(val);
	},
	equal(data) {
		return typeof data === "bigint";
	},
	name: Symbol("sleb128"),
});
