import { customType } from "../custom-type";
const test = new Int8Array(1);

export const int8 = customType({
	decode(buff) {
		return buff.readInt8();
	},
	encode(val, buffer) {
		buffer.writeInt8(val);
	},
	guard(data): data is number {
		if (typeof data !== "number") return false;
		test[0] = data;

		return test[0] === data;
	},
	name: "int8",
});
