import { customType } from "../custom-type";
const test = new Int8Array(1);

export const int8 = customType<number>({
	decode(buff) {
		return buff.readInt8();
	},
	encode(buffer, val) {
		buffer.writeInt8(val);
	},
	equal(data): data is number {
		if (typeof data !== "number") return false;
		test[0] = data;

		return test[0] === data;
	},
	name: Symbol("int8"),
});
