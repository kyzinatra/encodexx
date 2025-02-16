import { customType } from "../custom-type";

export const bool = customType<boolean>({
	decode(buff) {
		return buff.readBoolean();
	},
	encode(buffer, val) {
		buffer.writeBoolean(val);
	},
	equal(data) {
		return typeof data === "boolean";
	},
	name: Symbol("boolean"),
});
