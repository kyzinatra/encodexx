import { customType } from "../custom-type";
const test = new Uint16Array(1);

export const uint16 = customType({
	decode(buff) {
		return buff.readUint16();
	},
	encode(val, buffer) {
		buffer.writeUint16(val);
	},
	guard(data): data is number {
		if (typeof data !== "number") return false;
		test[0] = data;
		return test[0] === data;
	},
	name: "uint16",
});
