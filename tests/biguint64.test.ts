import { Serializer, t } from "../src";

describe("t.biguint64 type", () => {
	it("should serialize and deserialize maximum biguint value correctly", () => {
		const schema = { value: t.biguint64 };
		const serializer = new Serializer(schema);
		const original = { value: 18446744073709551615n };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should serialize and deserialize 0 correctly", () => {
		const schema = { value: t.biguint64 };
		const serializer = new Serializer(schema);
		const original = { value: 0n };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(0n);
	});

	it("should throw an error for a negative value", () => {
		const schema = { value: t.biguint64 };
		const serializer = new Serializer(schema);
		const original = { value: -1n };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should throw an error for a value exceeding maximum biguint", () => {
		const schema = { value: t.biguint64 };
		const serializer = new Serializer(schema);
		const original = { value: 18446744073709551616n };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should handle an array of biguint values correctly", () => {
		const serializer = new Serializer({ values: [t.biguint64] });
		const original = { values: [0n, 18446744073709551615n, 12345678901234567890n, 9876543210987654321n] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.values).toEqual(original.values);
	});

	it("should handle nested objects with biguint fields correctly", () => {
		const schema = {
			data: {
				a: t.biguint64,
				b: t.biguint64,
				nested: {
					c: t.biguint64,
					d: t.biguint64,
				},
			},
		};
		const serializer = new Serializer(schema);
		const original = {
			data: {
				a: 100n,
				b: 200n,
				nested: {
					c: 300n,
					d: 400n,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with biguint fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.biguint64,
					extra: {
						flag: t.biguint64,
					},
				},
			],
		});
		const original = {
			items: [
				{ value: 123456789n, extra: { flag: 987654321n } },
				{ value: 111111111n, extra: { flag: 222222222n } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
