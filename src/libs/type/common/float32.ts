import { customType } from "../custom-type";

export const float32 = customType({
	decode(buff) {
		return buff.readFloat32();
	},
	encode(buffer, val) {
		buffer.writeFloat32(val);
	},
	guard(data) {
		return typeof data === "number";
	},
	name: "float32",
});
