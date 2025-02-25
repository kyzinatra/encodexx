import { customType } from "../custom-type";

export const float64 = customType({
	decode(buff) {
		return buff.readFloat64();
	},
	encode(val, buffer) {
		buffer.writeFloat64(val);
	},
	guard(data) {
		return typeof data === "number";
	},
	name: "float64",
});
