import { customType } from "../custom-type";
const test = new Int32Array(1);

export const int32 = customType({
	decode(buff) {
		return buff.readInt32();
	},
	encode(buffer, val) {
		buffer.writeInt32(val);
	},
	equal(data): data is number {
		if (typeof data !== "number") return false;
		test[0] = data;
		return test[0] === data;
	},
	name: "int32",
});
