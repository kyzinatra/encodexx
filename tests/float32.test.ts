import { Serializer, t } from "../src";

describe("t.float32 type", () => {
	it("should serialize and deserialize 3.14 correctly", () => {
		const schema = { value: t.float32 };
		const serializer = new Serializer(schema);
		const original = { value: 3.14 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBeCloseTo(3.14, 5);
	});

	it("should serialize and deserialize -3.14 correctly", () => {
		const schema = { value: t.float32 };
		const serializer = new Serializer(schema);
		const original = { value: -3.14 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBeCloseTo(-3.14, 5);
	});

	it("should serialize and deserialize maximum float32 value correctly", () => {
		const schema = { value: t.float32 };
		const serializer = new Serializer(schema);
		const original = { value: 3.4028235e38 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		const relError = Math.abs(decoded.value - original.value) / Math.abs(original.value);
		expect(relError).toBeLessThan(1e-6);
	});

	it("should serialize and deserialize minimum float32 value correctly", () => {
		const schema = { value: t.float32 };
		const serializer = new Serializer(schema);
		const original = { value: -3.4028235e38 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		const relError = Math.abs(decoded.value - original.value) / Math.abs(original.value);
		expect(relError).toBeLessThan(1e-6);
	});

	it("should handle an array of float32 values correctly", () => {
		const serializer = new Serializer({ values: [t.float32] });
		const original = { values: [3.14, -3.14, 1.2345e10, -1.2345e10] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		for (let i = 0; i < original.values.length; i++) {
			const expected = original.values[i];
			const actual = decoded.values[i];
			if (expected !== 0) {
				const relativeError = Math.abs(actual - expected) / Math.abs(expected);
				expect(relativeError).toBeLessThan(1e-6);
			} else {
				expect(actual).toBeCloseTo(expected, 5);
			}
		}
	});

	it("should handle nested objects with float32 fields correctly", () => {
		const schema = {
			data: {
				a: t.float32,
				b: t.float32,
				nested: {
					c: t.float32,
					d: t.float32,
				},
			},
		};
		const serializer = new Serializer(schema);
		const original = {
			data: {
				a: 3.14,
				b: -3.14,
				nested: {
					c: 1.234e10,
					d: -1.234e10,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.data.a).toBeCloseTo(original.data.a, 5);
		expect(decoded.data.b).toBeCloseTo(original.data.b, 5);
		const tolerance = 300;
		expect(Math.abs(decoded.data.nested.c - original.data.nested.c)).toBeLessThanOrEqual(tolerance);
		expect(Math.abs(decoded.data.nested.d - original.data.nested.d)).toBeLessThanOrEqual(tolerance);
	});
	it("should handle an array of objects with float32 fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.float32,
					extra: {
						flag: t.float32,
					},
				},
			],
		});
		const original = {
			items: [
				{ value: 3.14, extra: { flag: -3.14 } },
				{ value: 1.23e5, extra: { flag: -1.23e5 } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		for (let i = 0; i < original.items.length; i++) {
			expect(decoded.items[i].value).toBeCloseTo(original.items[i].value, 5);
			expect(decoded.items[i].extra.flag).toBeCloseTo(original.items[i].extra.flag, 5);
		}
	});
});
