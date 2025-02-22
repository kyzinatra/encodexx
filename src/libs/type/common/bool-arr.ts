import { TypeMatchError } from "../../error/type-match";
import { customType } from "../custom-type";

export const boolArr = customType({
	decode(buffer) {
		const length = buffer.readUint32();
		const values = new Uint8Array(buffer.readBuffer((length + 7) >> 3));

		const result: boolean[] = new Array(length);

		for (let i = 0; i < length; i++) {
			//? Apply a mask with the desired i on the value from values and use & to check if there's a 1
			result[i] = (values[i >> 3] & (1 << (i & 7))) !== 0;
		}

		return result;
	},

	encode(buffer, val) {
		if (!Array.isArray(val)) throw new TypeMatchError();
		buffer.writeUint32(val.length);

		const byteLength = (val.length + 7) >> 3;
		const arr = new Uint8Array(byteLength);

		for (let i = 0; i < val.length; i++) {
			if (val[i]) {
				//? Apply a mask with the desired i on the value from values and use | to set the value
				arr[i >> 3] |= 1 << (i & 7);
			}
		}

		buffer.writeBuffer(arr);
	},
	guard(data) {
		return Array.isArray(data) && data.every((el) => typeof el === "boolean");
	},
	name: "boolArr",
});
