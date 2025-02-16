// uint8.test.ts

import { Serializer, t } from "../src";

describe("t.uint8 type", () => {
	it("should serialize and deserialize 255 correctly", () => {
		const schema = { value: t.uint8 };
		const serializer = new Serializer(schema);

		const original = { value: 255 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.value).toBe(255);
	});

	it("should serialize and deserialize 0 correctly", () => {
		const schema = { value: t.uint8 };
		const serializer = new Serializer(schema);

		const original = { value: 0 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.value).toBe(0);
	});

	it("should throw an error for a negative value", () => {
		const schema = { value: t.uint8 };
		const serializer = new Serializer(schema);

		const original = { value: -1 };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should throw an error for a value exceeding 255", () => {
		const schema = { value: t.uint8 };
		const serializer = new Serializer(schema);

		const original = { value: 256 };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should handle an array of uint8 values correctly", () => {
		const serializer = new Serializer({ values: [t.uint8] });

		const original = { values: [0, 255, 100, 200, 50] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.values).toEqual([0, 255, 100, 200, 50]);
	});

	it("should handle nested objects with uint8 fields correctly", () => {
		const schema = {
			data: {
				a: t.uint8,
				b: t.uint8,
				nested: {
					c: t.uint8,
					d: t.uint8,
				},
			},
		};
		const serializer = new Serializer(schema);

		const original = {
			data: {
				a: 10,
				b: 20,
				nested: {
					c: 30,
					d: 40,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with uint8 fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.uint8,
					extra: {
						flag: t.uint8,
					},
				},
			],
		});

		const original = {
			items: [
				{ value: 50, extra: { flag: 100 } },
				{ value: 200, extra: { flag: 150 } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});
});
