import { Serializer, t } from "../src";

describe("t.int16 type", () => {
	it("should serialize and deserialize 32767 correctly", () => {
		const schema = { value: t.int16 };
		const serializer = new Serializer(schema);

		const original = { value: 32767 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.value).toBe(32767);
	});

	it("should serialize and deserialize -32768 correctly", () => {
		const schema = { value: t.int16 };
		const serializer = new Serializer(schema);

		const original = { value: -32768 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.value).toBe(-32768);
	});

	it("should throw an error for a value exceeding 32767", () => {
		const schema = { value: t.int16 };
		const serializer = new Serializer(schema);

		const original = { value: 32768 };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should throw an error for a value less than -32768", () => {
		const schema = { value: t.int16 };
		const serializer = new Serializer(schema);

		const original = { value: -32769 };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should handle an array of int16 values correctly", () => {
		const serializer = new Serializer({ values: [t.int16] });

		const original = { values: [0, 32767, -32768, 123, -456] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.values).toEqual([0, 32767, -32768, 123, -456]);
	});

	it("should handle nested objects with int16 fields correctly", () => {
		const schema = {
			data: {
				a: t.int16,
				b: t.int16,
				nested: {
					c: t.int16,
					d: t.int16,
				},
			},
		};
		const serializer = new Serializer(schema);

		const original = {
			data: {
				a: 1234,
				b: -1234,
				nested: {
					c: 32767,
					d: -32768,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with int16 fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.int16,
					extra: {
						flag: t.int16,
					},
				},
			],
		});

		const original = {
			items: [
				{ value: 300, extra: { flag: -300 } },
				{ value: 1500, extra: { flag: -1500 } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});
});
