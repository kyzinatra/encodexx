import { Serializer, t } from "../src";

describe("t.none type", () => {
	it("should serialize and deserialize null correctly", () => {
		const serializer = new Serializer({ value: t.none });
		const original = { value: null };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(null);
	});

	it("should handle an array of null values correctly", () => {
		const serializer = new Serializer({ values: [t.none] });
		const original = { values: [null, null, null] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.values).toEqual(original.values);
	});

	it("should handle nested objects with null fields correctly", () => {
		const schema = {
			data: {
				a: t.none,
				nested: {
					b: t.none,
				},
			},
		};
		const serializer = new Serializer(schema);
		const original = {
			data: {
				a: null,
				nested: {
					b: null,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with null fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.none,
				},
			],
		});
		const original = {
			items: [{ value: null }, { value: null }],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
