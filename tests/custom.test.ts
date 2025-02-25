import { Serializer, t, customType } from "../src";

interface TMyType {
	name: string;
	age: number;
}

const myType = customType<TMyType>({
	decode(buffer) {
		return {
			name: buffer.readString(),
			age: buffer.readUint8(),
		};
	},
	encode(val, buffer) {
		buffer.writeString(val.name);
		buffer.writeUint8(val.age);
	},
	guard(data): data is TMyType {
		if (typeof data !== "object" || !data) return false;
		if (!("name" in data) || typeof data.name !== "string") return false;
		if (!("age" in data) || typeof data.age !== "number") return false;

		return true;
	},
	name: "mytype",
});

describe("Custom type myType", () => {
	it("should serialize and deserialize a valid TMyType object", () => {
		const serializer = new Serializer(myType);

		const original = { name: "Alice", age: 30 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});

	it("should throw an error if data does not pass the guard check (invalid shape)", () => {
		const schema = { user: myType } as const;
		const serializer = new Serializer(schema, { strict: true });

		const invalidData1 = { user: { name: "Charlie" } };
		expect(() => serializer.encode(invalidData1 as any)).toThrow();

		const invalidData2 = { user: { name: "Bob", age: "not-a-number" } };
		expect(() => serializer.encode(invalidData2 as any)).toThrow();

		const invalidData3 = { user: { name: 123, age: 25 } };
		expect(() => serializer.encode(invalidData3 as any)).toThrow();
	});

	it("should handle custom type in arrays if needed", () => {
		const serializer = new Serializer({ users: [myType] });

		const original = {
			users: [
				{ name: "John", age: 20 },
				{ name: "Jane", age: 25 },
			],
		};

		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});

	it("should handle nested custom type fields", () => {
		const schema = {
			group: {
				leader: myType,
				member: myType,
			},
		} as const;
		const serializer = new Serializer(schema);

		const original = {
			group: {
				leader: { name: "LeaderName", age: 40 },
				member: { name: "MemberName", age: 35 },
			},
		};

		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});
});
