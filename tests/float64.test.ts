import { Serializer, t } from "../src";

describe("t.float64 type", () => {
	it("should serialize and deserialize 3.14 correctly", () => {
		const schema = { value: t.float64 };
		const serializer = new Serializer(schema);
		const original = { value: 3.14 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBeCloseTo(original.value, 10);
	});

	it("should serialize and deserialize -3.14 correctly", () => {
		const schema = { value: t.float64 };
		const serializer = new Serializer(schema);
		const original = { value: -3.14 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBeCloseTo(original.value, 10);
	});

	it("should serialize and deserialize a very large float64 value correctly", () => {
		const schema = { value: t.float64 };
		const serializer = new Serializer(schema);
		const original = { value: 1.2345e200 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		const relError = Math.abs(decoded.value - original.value) / Math.abs(original.value);
		expect(relError).toBeLessThan(1e-12);
	});

	it("should serialize and deserialize a very small float64 value correctly", () => {
		const schema = { value: t.float64 };
		const serializer = new Serializer(schema);
		const original = { value: -1.2345e200 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		const relError = Math.abs(decoded.value - original.value) / Math.abs(original.value);
		expect(relError).toBeLessThan(1e-12);
	});

	it("should handle an array of float64 values correctly", () => {
		const serializer = new Serializer({ values: [t.float64] });
		const original = { values: [3.14, -3.14, 1.2345e100, -1.2345e100] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		for (let i = 0; i < original.values.length; i++) {
			const expected = original.values[i];
			const actual = decoded.values[i];
			if (expected !== 0) {
				const relError = Math.abs(actual - expected) / Math.abs(expected);
				expect(relError).toBeLessThan(1e-12);
			} else {
				expect(actual).toBeCloseTo(expected, 10);
			}
		}
	});

	it("should handle nested objects with float64 fields correctly", () => {
		const schema = {
			data: {
				a: t.float64,
				b: t.float64,
				nested: {
					c: t.float64,
					d: t.float64,
				},
			},
		};
		const serializer = new Serializer(schema);
		const original = {
			data: {
				a: 3.14,
				b: -3.14,
				nested: {
					c: 1.2345e50,
					d: -1.2345e50,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.data.a).toBeCloseTo(original.data.a, 10);
		expect(decoded.data.b).toBeCloseTo(original.data.b, 10);
		const relErrorC =
			Math.abs(decoded.data.nested.c - original.data.nested.c) / Math.abs(original.data.nested.c);
		const relErrorD =
			Math.abs(decoded.data.nested.d - original.data.nested.d) / Math.abs(original.data.nested.d);
		expect(relErrorC).toBeLessThan(1e-12);
		expect(relErrorD).toBeLessThan(1e-12);
	});

	it("should handle an array of objects with float64 fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.float64,
					extra: {
						flag: t.float64,
					},
				},
			],
		});
		const original = {
			items: [
				{ value: 3.14, extra: { flag: -3.14 } },
				{ value: 1.23e10, extra: { flag: -1.23e10 } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		for (let i = 0; i < original.items.length; i++) {
			expect(decoded.items[i].value).toBeCloseTo(original.items[i].value, 10);
			expect(decoded.items[i].extra.flag).toBeCloseTo(original.items[i].extra.flag, 10);
		}
	});
});
