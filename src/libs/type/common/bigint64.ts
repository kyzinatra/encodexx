import { customType } from "../custom-type";
const test = new BigInt64Array(1);

export const bigint64 = customType({
	decode(buff) {
		return buff.readBigInt64();
	},
	encode(buffer, val) {
		buffer.writeBigInt64(val);
	},
	guard(data): data is bigint {
		if (typeof data !== "bigint") return false;

		test[0] = data;
		return test[0] === data;
	},
	name: "bigint64",
});
