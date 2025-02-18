import { customType } from "../custom-type";

export const undef = customType({
	decode() {
		return undefined;
	},
	encode() {},
	equal(data) {
		return data === undefined;
	},
	name: "undef",
});
