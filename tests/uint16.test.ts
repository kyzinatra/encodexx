// uint16.test.ts

import { Serializer, t } from "../src";
describe("t.uint16 type", () => {
	it("should serialize and deserialize 65535 correctly", () => {
		const schema = { value: t.uint16 };
		const serializer = new Serializer(schema);

		const original = { value: 65535 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.value).toBe(65535);
	});

	it("should serialize and deserialize 0 correctly", () => {
		const schema = { value: t.uint16 };
		const serializer = new Serializer(schema);

		const original = { value: 0 };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.value).toBe(0);
	});

	it("should throw an error for a negative value", () => {
		const schema = { value: t.uint16 };
		const serializer = new Serializer(schema);

		const original = { value: -1 };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should throw an error for a value exceeding 65535", () => {
		const schema = { value: t.uint16 };
		const serializer = new Serializer(schema);

		const original = { value: 65536 };
		expect(() => serializer.encode(original)).toThrow();
	});

	it("should handle an array of uint16 values correctly", () => {
		const serializer = new Serializer({ values: [t.uint16] });

		const original = { values: [0, 65535, 12345, 54321, 30000] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded.values).toEqual([0, 65535, 12345, 54321, 30000]);
	});

	it("should handle nested objects with uint16 fields correctly", () => {
		const schema = {
			data: {
				a: t.uint16,
				b: t.uint16,
				nested: {
					c: t.uint16,
					d: t.uint16,
				},
			},
		};
		const serializer = new Serializer(schema);

		const original = {
			data: {
				a: 1000,
				b: 2000,
				nested: {
					c: 3000,
					d: 4000,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with uint16 fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.uint16,
					extra: {
						flag: t.uint16,
					},
				},
			],
		});

		const original = {
			items: [
				{ value: 500, extra: { flag: 1000 } },
				{ value: 600, extra: { flag: 1100 } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		expect(decoded).toEqual(original);
	});
});
