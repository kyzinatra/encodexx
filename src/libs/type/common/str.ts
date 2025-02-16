import { customType } from "../custom-type";

export const str = customType<string>({
	decode(buff) {
		return buff.readString();
	},
	encode(buffer, val) {
		buffer.writeString(val);
	},
	equal(data) {
		return typeof data === "string";
	},
	name: Symbol("string"),
});
