import { customType } from "../custom-type";

export const date = customType<Date>({
	decode(buff) {
		return buff.readDate();
	},
	encode(buffer, val) {
		buffer.writeDate(val);
	},
	equal(data) {
		return data instanceof Date;
	},
	name: Symbol("date"),
});
