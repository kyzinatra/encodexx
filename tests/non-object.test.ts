import { Serializer, t } from "../src";

describe("Non-object schemas", () => {
	it("should serialize and deserialize an array of booleans", () => {
		const serializer = new Serializer([t.bool]);

		const original = [true, false, true];
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});

	it("should serialize and deserialize an array of int8", () => {
		const serializer = new Serializer([t.int8]);

		const original = [0, 127, -128, 42, -42];
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});

	it("should throw when values exceed int8 range in an array", () => {
		const serializer = new Serializer([t.int8]);

		const original = [0, 127, 128];

		expect(() => serializer.encode(original)).toThrow();
	});

	it("should handle an array of arrays", () => {
		const serializer = new Serializer([[t.bool]]);

		const original = [[true, false], [false, true, true], []];
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});

	it("should serialize and deserialize a string type", () => {
		const schema = t.str;
		const serializer = new Serializer(schema);

		const original = "hello";
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});

	it("should handle an or elements", () => {
		const schema = t.or(t.int8, t.str);
		const serializer = new Serializer(schema);

		const originalWithValue = "hi";
		const encodedWithValue = serializer.encode(originalWithValue);
		const decodedWithValue = serializer.decode(encodedWithValue);
		expect(decodedWithValue).toEqual(originalWithValue);
	});
});
