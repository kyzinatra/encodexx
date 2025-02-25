import { customType } from "../custom-type";
const test = new Uint8Array(1);

export const uint8 = customType({
	decode(buff) {
		return buff.readUint8();
	},
	encode(val, buffer) {
		buffer.writeUint8(val);
	},
	guard(data): data is number {
		if (typeof data !== "number") return false;
		test[0] = data;
		return test[0] === data;
	},
	name: "uint8",
});
