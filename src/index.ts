import { Serializer } from "./libs/serializer";
import { customType } from "./libs/type/custom-type";

export { TypeMatchError } from "./libs/error/type-match";
export { Serializer } from "./libs/serializer";
export { t } from "./libs/type/common";
export { TSchema } from "./libs/serializer/index.type";
export { ArraySingle, ExtractObj } from "./types/types";
export { customType } from "./libs/type/custom-type";

type TMyType = {
	name: string;
	age: number;
};

const myType = customType<TMyType>({
	decode(buffer) {
		return {
			name: buffer.readString(),
			age: buffer.readUint8(),
		};
	},
	encode(buffer, val) {
		buffer.writeString(val.name);
		buffer.writeUint8(val.age);
	},
	guard(data): data is TMyType {
		if (typeof data !== "object" || !data) return false;
		if (!("name" in data) || typeof data.name !== "string") return false;
		if (!("age" in data) || typeof data.age !== "number") return false;

		return true;
	},
	name: "myTtype",
});

new Serializer({
	val: myType,
});
