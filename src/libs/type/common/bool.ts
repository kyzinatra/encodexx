import { customType } from "../custom-type";

export const bool = customType({
	decode(buff) {
		return buff.readBoolean();
	},
	encode(val, buffer) {
		buffer.writeBoolean(val);
	},
	guard(data) {
		return typeof data === "boolean";
	},
	name: "boolean",
});
