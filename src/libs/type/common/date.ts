import { customType } from "../custom-type";

export const date = customType({
	decode(buff) {
		return buff.readDate();
	},
	encode(val, buffer) {
		buffer.writeDate(val);
	},
	guard(data) {
		return data instanceof Date;
	},
	name: "date",
});
