import { customType } from "../custom-type";
const test = new Uint16Array(1);

export const uint32 = customType({
	decode(buff) {
		return buff.readUint32();
	},
	encode(buffer, val) {
		buffer.writeUint32(val);
	},
	equal(data): data is number {
		if (typeof data !== "number") return false;
		test[0] = data;
		return test[0] === data;
	},
	name: "uint32",
});
