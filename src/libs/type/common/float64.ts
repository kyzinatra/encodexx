import { customType } from "../custom-type";

export const float64 = customType<number>({
	decode(buff) {
		return buff.readFloat64();
	},
	encode(buffer, val) {
		buffer.writeFloat64(val);
	},
	equal(data) {
		return typeof data === "number";
	},
	name: Symbol("float64"),
});
