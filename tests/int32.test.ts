import { Serializer, t } from "../src";

describe("t.int32 type", () => {
	it("should serialize and deserialize 2147483647 correctly", () => {
		const schema = { value: t.int32 };
		const serializer = new Serializer(schema);

		const original = { value: 2147483647 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.value).toBe(2147483647);
	});

	it("should serialize and deserialize -2147483648 correctly", () => {
		const schema = { value: t.int32 };
		const serializer = new Serializer(schema);

		const original = { value: -2147483648 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.value).toBe(-2147483648);
	});

	it("should throw an error for a value exceeding 2147483647", () => {
		const schema = { value: t.int32 };
		const serializer = new Serializer(schema);

		const original = { value: 2147483648 };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should throw an error for a value less than -2147483648", () => {
		const schema = { value: t.int32 };
		const serializer = new Serializer(schema);

		const original = { value: -2147483649 };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should handle an array of int32 values correctly", () => {
		const serializer = new Serializer({ values: [t.int32] });

		const original = { values: [0, 2147483647, -2147483648, 123456, -654321] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.values).toEqual([0, 2147483647, -2147483648, 123456, -654321]);
	});

	it("should handle nested objects with int32 fields correctly", () => {
		const schema = {
			data: {
				a: t.int32,
				b: t.int32,
				nested: {
					c: t.int32,
					d: t.int32,
				},
			},
		};
		const serializer = new Serializer(schema);

		const original = {
			data: {
				a: 123456,
				b: -123456,
				nested: {
					c: 2147483647,
					d: -2147483648,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with int32 fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.int32,
					extra: {
						flag: t.int32,
					},
				},
			],
		});

		const original = {
			items: [
				{ value: 100000, extra: { flag: -100000 } },
				{ value: 987654, extra: { flag: -987654 } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});

	it("should handle map an array of objects with int32 fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.int32,
					extra: {
						flag: t.int32,
					},
				},
			],
		});

		const original = {
			items: [
				{ value: 100000, extra: { flag: -100000 } },
				{ value: 987654, extra: { flag: -987654 } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);

		const mapped = serializer.map(encoded, (value) => {
			return {
				items: [{ value: 12, extra: { flag: -234 } }, ...value.items, { value: 12, extra: { flag: -234 } }],
			};
		});

		expect(serializer.decode(mapped)).toEqual({
			items: [
				{ value: 12, extra: { flag: -234 } },
				{ value: 100000, extra: { flag: -100000 } },
				{ value: 987654, extra: { flag: -987654 } },
				{ value: 12, extra: { flag: -234 } },
			],
		});
	});
});
