import { customType } from "../custom-type";
const test = new Int16Array(1);

export const int16 = customType({
	decode(buff) {
		return buff.readInt16();
	},
	encode(val, buffer) {
		buffer.writeInt16(val);
	},
	guard(data): data is number {
		if (typeof data !== "number") return false;
		test[0] = data;
		return test[0] === data;
	},
	name: "int16",
});
