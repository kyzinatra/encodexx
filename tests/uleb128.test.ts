import { Serializer, t } from "../src";

describe("t.uleb128 type", () => {
	it("should serialize and deserialize zero correctly", () => {
		const schema = { value: t.uleb128 };
		const serializer = new Serializer(schema);
		const original = { value: 0n };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should serialize and deserialize small positive number correctly", () => {
		const schema = { value: t.uleb128 };
		const serializer = new Serializer(schema);
		const original = { value: 1n << 50000n };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should serialize and deserialize a large positive number correctly", () => {
		const schema = { value: t.uleb128 };
		const serializer = new Serializer(schema);
		const original = { value: 9007199254740991n };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should serialize and deserialize an even bigger number correctly", () => {
		const schema = { value: t.uleb128 };
		const serializer = new Serializer(schema);
		const original = { value: (1n << 70n) - 1n };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should throw an error for negative values", () => {
		const schema = { value: t.uleb128 };
		const serializer = new Serializer(schema, { strict: true });
		const original = { value: -1n };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should handle an array of uleb128 values correctly", () => {
		const serializer = new Serializer({ values: [t.uleb128] });
		const original = {
			values: [0n, 1n, 127n, 128n, 30000n, 1n << 40n, 1n << 64n],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.values).toEqual(original.values);
	});

	it("should handle nested objects with uleb128 fields correctly", () => {
		const schema = {
			data: {
				a: t.uleb128,
				b: t.uleb128,
				nested: {
					c: t.uleb128,
					d: t.uleb128,
				},
			},
		};
		const serializer = new Serializer(schema);
		const original = {
			data: {
				a: 100n,
				b: 123456789123456789n,
				nested: {
					c: 500n,
					d: 1n << 150n,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with uleb128 fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.uleb128,
					extra: {
						flag: t.uleb128,
					},
				},
			],
		});
		const original = {
			items: [
				{ value: 123456789n, extra: { flag: 987654321n } },
				{ value: 999999999999999999n, extra: { flag: 0n } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
