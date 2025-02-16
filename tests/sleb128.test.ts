import { Serializer, t } from "../src";

describe("t.sleb128 type", () => {
	it("should serialize and deserialize zero correctly", () => {
		const schema = { value: t.sleb128 };
		const serializer = new Serializer(schema);
		const original = { value: 0n };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should serialize and deserialize a small positive number correctly", () => {
		const schema = { value: t.sleb128 };
		const serializer = new Serializer(schema);
		const original = { value: 12345n };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should serialize and deserialize a small negative number correctly", () => {
		const schema = { value: t.sleb128 };
		const serializer = new Serializer(schema);
		const original = { value: -12345n };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should serialize and deserialize a large positive number correctly", () => {
		const schema = { value: t.sleb128 };
		const serializer = new Serializer(schema);
		const original = { value: 9007199254740991n };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should serialize and deserialize a large negative number correctly", () => {
		const schema = { value: t.sleb128 };
		const serializer = new Serializer(schema);
		const original = { value: -(1n << 60n) };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should serialize and deserialize an even bigger positive number correctly", () => {
		const schema = { value: t.sleb128 };
		const serializer = new Serializer(schema);
		// 2^70
		const original = { value: (1n << 70n) - 1n };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should serialize and deserialize an even bigger negative number correctly", () => {
		const schema = { value: t.sleb128 };
		const serializer = new Serializer(schema);
		// -2^70
		const original = { value: -(1n << 70n) };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should handle an array of sleb128 values correctly", () => {
		const serializer = new Serializer({ values: [t.sleb128] });
		const original = {
			values: [0n, 1n, -1n, 127n, -128n, 30000n, -30000n, 1n << 50n, -(1n << 50n)],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.values).toEqual(original.values);
	});

	it("should handle nested objects with sleb128 fields correctly", () => {
		const schema = {
			data: {
				a: t.sleb128,
				b: t.sleb128,
				nested: {
					c: t.sleb128,
					d: t.sleb128,
				},
			},
		};
		const serializer = new Serializer(schema);
		const original = {
			data: {
				a: 100n,
				b: -999999999999999999n,
				nested: {
					c: -(1n << 50n),
					d: 1n << 52n,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with sleb128 fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.sleb128,
					extra: {
						flag: t.sleb128,
					},
				},
			],
		});
		const original = {
			items: [
				{ value: 123456789n, extra: { flag: 987654321n } },
				{ value: -123456789n, extra: { flag: -987654321n } },
				{ value: 1n << 165n, extra: { flag: -(1n << 165n) } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
