import { Serializer, t } from "../src";

describe("t.uint32 type", () => {
	it("should serialize and deserialize 4294967295 correctly", () => {
		const schema = { value: t.uint32 };
		const serializer = new Serializer(schema);
		const original = { value: 4294967295 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(4294967295);
	});

	it("should serialize and deserialize 0 correctly", () => {
		const schema = { value: t.uint32 };
		const serializer = new Serializer(schema);
		const original = { value: 0 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(0);
	});

	it("should throw an error for a negative value", () => {
		const schema = { value: t.uint32 };
		const serializer = new Serializer(schema);
		const original = { value: -1 };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should throw an error for a value exceeding 4294967295", () => {
		const schema = { value: t.uint32 };
		const serializer = new Serializer(schema);
		const original = { value: 4294967296 };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should handle an array of uint32 values correctly", () => {
		const serializer = new Serializer({ values: [t.uint32] });
		const original = { values: [0, 4294967295, 123456789, 987654321] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.values).toEqual([0, 4294967295, 123456789, 987654321]);
	});

	it("should handle nested objects with uint32 fields correctly", () => {
		const schema = {
			data: {
				a: t.uint32,
				b: t.uint32,
				nested: {
					c: t.uint32,
					d: t.uint32,
				},
			},
		};
		const serializer = new Serializer(schema);
		const original = {
			data: {
				a: 100000,
				b: 200000,
				nested: {
					c: 300000,
					d: 400000,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with uint32 fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.uint32,
					extra: {
						flag: t.uint32,
					},
				},
			],
		});
		const original = {
			items: [
				{ value: 1000000, extra: { flag: 2000000 } },
				{ value: 3000000, extra: { flag: 4000000 } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
