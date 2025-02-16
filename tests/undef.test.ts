import { Serializer, t } from "../src";

describe("t.undef type", () => {
	it("should serialize and deserialize undefined correctly", () => {
		const serializer = new Serializer({ value: t.undef });
		const original = { value: undefined };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(undefined);
	});

	it("should handle an array of undefined values correctly", () => {
		const serializer = new Serializer({ values: [t.undef] });
		const original = { values: [undefined, undefined, undefined] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.values).toEqual(original.values);
	});

	it("should handle nested objects with undefined fields correctly", () => {
		const schema = {
			data: {
				a: t.undef,
				nested: {
					b: t.undef,
				},
			},
		};
		const serializer = new Serializer(schema);
		const original = {
			data: {
				a: undefined,
				nested: {
					b: undefined,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with undefined fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.undef,
				},
			],
		});
		const original = {
			items: [{ value: undefined }, { value: undefined }],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
