import { ArraySingle, Serializer, t, TSchema } from "../src";

describe("t.int8 type", () => {
	it("should serialize and deserialize 127 correctly", () => {
		const schema = { value: t.int8 };
		const serializer = new Serializer(schema);

		const original = { value: 127 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.value).toBe(127);
	});

	it("should serialize and deserialize -128 correctly", () => {
		const schema = { value: t.int8 };
		const serializer = new Serializer(schema);

		const original = { value: -128 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.value).toBe(-128);
	});

	it("should throw an error for a value exceeding 127", () => {
		const schema = { value: t.int8 };
		const serializer = new Serializer(schema);

		const original = { value: 128 };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should throw an error for a value less than -128", () => {
		const schema = { value: t.int8 };
		const serializer = new Serializer(schema);

		const original = { value: -129 };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should handle an array of int8 values correctly", () => {
		const schema = { values: [t.int8] };
		const serializer = new Serializer(schema as ArraySingle<typeof schema>);

		const original = { values: [0, 127, -128, 45, -20] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.values).toEqual([0, 127, -128, 45, -20]);
	});

	it("should handle nested objects with int8 fields correctly", () => {
		const schema = {
			data: {
				a: t.int8,
				b: t.int8,
				nested: {
					c: t.int8,
					d: t.int8,
				},
			},
		};
		const serializer = new Serializer(schema);

		const original = {
			data: {
				a: 10,
				b: -10,
				nested: {
					c: 50,
					d: -50,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with int8 fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.int8,
					extra: {
						flag: t.int8,
					},
				},
			],
		});

		const original = {
			items: [
				{ value: 100, extra: { flag: -100 } },
				{ value: -50, extra: { flag: 50 } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});
});
