import { customType } from "../custom-type";

export const sleb128 = customType({
	decode(buff) {
		return buff.readSleb128();
	},
	encode(buffer, val) {
		buffer.writeSleb128(val);
	},
	equal(data) {
		return typeof data === "bigint";
	},
	name: "sleb128",
});
