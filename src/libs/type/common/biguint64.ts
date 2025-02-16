import { customType } from "../custom-type";
const test = new BigUint64Array(1);

export const biguint64 = customType<bigint>({
	decode(buff) {
		return buff.readBigUint64();
	},
	encode(buffer, val) {
		buffer.writeBigUint64(val);
	},
	equal(data): data is bigint {
		if (typeof data !== "bigint") return false;
		test[0] = data;
		return test[0] === data;
	},
	name: Symbol("biguint64"),
});
