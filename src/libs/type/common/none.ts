import { customType } from "../custom-type";

export const none = customType<null>({
	decode() {
		return null;
	},
	encode() {},
	equal(data) {
		return data === null;
	},
	name: Symbol("null"),
});
