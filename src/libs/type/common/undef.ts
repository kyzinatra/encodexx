import { customType } from "../custom-type";

export const undef = customType<undefined>({
	decode() {
		return undefined;
	},
	encode() {},
	equal(data) {
		return data === undefined;
	},
	name: Symbol("undefined"),
});
