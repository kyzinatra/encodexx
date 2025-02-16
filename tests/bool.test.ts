import { Serializer, t } from "../src";

describe("t.bool type", () => {
	it("should serialize and deserialize true correctly", () => {
		const serializer = new Serializer({ value: t.bool });
		const original = { value: true };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(true);
	});

	it("should serialize and deserialize false correctly", () => {
		const serializer = new Serializer({ value: t.bool });
		const original = { value: false };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(false);
	});

	it("should handle an array of boolean values correctly", () => {
		const serializer = new Serializer({ values: [t.bool] });
		const original = { values: [true, false, true, true, false] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.values).toEqual(original.values);
	});

	it("should handle nested objects with boolean fields correctly", () => {
		const schema = {
			data: {
				a: t.bool,
				b: t.bool,
				nested: {
					c: t.bool,
					d: t.bool,
				},
			},
		};
		const serializer = new Serializer(schema);
		const original = {
			data: {
				a: true,
				b: false,
				nested: {
					c: true,
					d: false,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with boolean fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					value: t.bool,
					extra: {
						flag: t.bool,
					},
				},
			],
		});
		const original = {
			items: [
				{ value: true, extra: { flag: false } },
				{ value: false, extra: { flag: true } },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
