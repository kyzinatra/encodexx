import { Serializer, t } from "../src";

describe("t.boolArr type", () => {
	it("should serialize and deserialize an array of booleans correctly", () => {
		const serializer = new Serializer({ values: t.boolArr });
		const original = { values: [true, false, true, false, false, true, true, false] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.values).toEqual(original.values);
	});

	it("should serialize and deserialize an empty array correctly", () => {
		const serializer = new Serializer({ values: t.boolArr });
		const original = { values: [] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.values).toEqual([]);
	});

	it("should throw an error when a non-array is passed", () => {
		const serializer = new Serializer({ values: t.boolArr });
		const original = { values: true };
		//@ts-expect-error
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should handle nested objects with boolArr fields correctly", () => {
		const schema = {
			data: {
				flags: t.boolArr,
			},
		};
		const serializer = new Serializer(schema);
		const original = { data: { flags: [false, true, false, true] } };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with boolArr fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					flags: t.boolArr,
				},
			],
		});
		const original = { items: [{ flags: [true, false] }, { flags: [false, false, true] }] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
