import { Serializer } from "../../serializer";
import { TConvertValueToType, TSchema } from "../../serializer/index.type";
import { customType } from "../custom-type";

export function optional<T extends TSchema>(type: T) {
	const ser = new Serializer(type, { resetCursor: false });
	type TOptional = TConvertValueToType<T> | undefined;
	return customType<TOptional>({
		decode(buffer) {
			if (buffer.readBoolean()) return;
			return ser.decode(buffer);
		},
		encode(value, buffer) {
			if (value === undefined) return buffer.writeBoolean(true);
			buffer.writeBoolean(false);
			return ser.encode(value, buffer);
		},
		guard(data): data is TOptional {
			if (data === undefined) return true;
			return ser.guard(data);
		},
		name: `Optional${ser.name}`,
	});
}
