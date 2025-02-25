import { customType } from "../custom-type";

export const str = customType({
	decode(buff) {
		return buff.readString();
	},
	encode(val, buffer) {
		buffer.writeString(val);
	},
	guard(data) {
		return typeof data === "string";
	},
	name: "str",
});
