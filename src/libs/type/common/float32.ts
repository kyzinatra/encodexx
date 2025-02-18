import { customType } from "../custom-type";

export const float32 = customType({
	decode(buff) {
		return buff.readFloat32();
	},
	encode(buffer, val) {
		buffer.writeFloat32(val);
	},
	equal(data): data is number {
		if (typeof data !== "number") return false;
		const rounded = Math.round(data * 1e7) / 1e7;
		return Math.abs(data - rounded) < Number.EPSILON;
	},
	name: "float32",
});
