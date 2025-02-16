import { Serializer, t } from "../src";

describe("t.bigint64 type", () => {
	it("should serialize and deserialize maximum bigint64 value correctly", () => {
		const schema = { value: t.bigint64 };
		const serializer = new Serializer(schema);
		const original = { value: 9223372036854775807n };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should serialize and deserialize minimum bigint64 value correctly", () => {
		const schema = { value: t.bigint64 };
		const serializer = new Serializer(schema);
		const original = { value: -9223372036854775808n };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should throw an error for a value exceeding maximum bigint64", () => {
		const schema = { value: t.bigint64 };
		const serializer = new Serializer(schema);
		const original = { value: 9223372036854775808n };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should throw an error for a value below minimum bigint64", () => {
		const schema = { value: t.bigint64 };
		const serializer = new Serializer(schema);
		const original = { value: -9223372036854775809n };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should handle an array of bigint64 values correctly", () => {
		const serializer = new Serializer({ values: [t.bigint64] });
		const original = {
			values: [0n, 9223372036854775807n, -9223372036854775808n, 1234567890123456789n, -987654321098765432n],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.values).toEqual(original.values);
	});

	it("should handle nested objects with bigint64 fields correctly", () => {
		const schema = {
			data: {
				a: t.bigint64,
				b: t.bigint64,
				nested: {
					c: t.bigint64,
					d: t.bigint64,
				},
			},
		};
		const serializer = new Serializer(schema);
		const original = {
			data: {
				a: 100n,
				b: -100n,
				nested: {
					c: 500n,
					d: -500n,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with bigint64 fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.bigint64,
					extra: {
						flag: t.bigint64,
					},
				},
			],
		});
		const original = {
			items: [
				{ value: 123456789n, extra: { flag: 987654321n } },
				{ value: -123456789n, extra: { flag: -987654321n } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
