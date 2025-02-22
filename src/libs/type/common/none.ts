import { customType } from "../custom-type";

export const none = customType({
	decode() {
		return null;
	},
	encode() {},
	guard(data) {
		return data === null;
	},
	name: "null",
});
