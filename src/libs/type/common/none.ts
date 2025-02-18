import { customType } from "../custom-type";

export const none = customType({
	decode() {
		return null;
	},
	encode() {},
	equal(data) {
		return data === null;
	},
	name: "null",
});
