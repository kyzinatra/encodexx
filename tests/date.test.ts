import { Serializer, t } from "../src";

describe("t.date type", () => {
	it("should serialize and deserialize a Date object correctly", () => {
		const serializer = new Serializer({ value: t.date });
		const originalDate = new Date();
		const original = { value: originalDate };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value instanceof Date).toBe(true);
		expect(decoded.value.getTime()).toBe(originalDate.getTime());
	});

	it("should handle an array of Date objects correctly", () => {
		const serializer = new Serializer({ values: [t.date] });
		const date1 = new Date();
		const date2 = new Date(Date.now() - 1000);

		const original = { values: [date1, date2] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(Array.isArray(decoded.values)).toBe(true);
		expect(decoded.values.length).toBe(2);

		decoded.values.forEach((d: any, i: number) => {
			expect(d instanceof Date).toBe(true);
			expect(d.getTime()).toBe(original.values[i].getTime());
		});
	});

	it("should handle nested objects with Date fields correctly", () => {
		const schema = {
			data: {
				createdAt: t.date,
				updatedAt: t.date,
				nested: {
					publishedAt: t.date,
				},
			},
		};
		const serializer = new Serializer(schema);
		const now = new Date();
		const original = {
			data: {
				createdAt: now,
				updatedAt: new Date(now.getTime() + 1000),
				nested: {
					publishedAt: new Date(now.getTime() + 2000),
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.data.createdAt instanceof Date).toBe(true);
		expect(decoded.data.createdAt.getTime()).toBe(original.data.createdAt.getTime());
		expect(decoded.data.updatedAt.getTime()).toBe(original.data.updatedAt.getTime());
		expect(decoded.data.nested.publishedAt.getTime()).toBe(original.data.nested.publishedAt.getTime());
	});

	it("should handle an array of objects with Date fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					eventDate: t.date,
				},
			],
		});
		const now = new Date();
		const original = {
			items: [{ eventDate: now }, { eventDate: new Date(now.getTime() + 5000) }],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		decoded.items.forEach((item: any, i: number) => {
			expect(item.eventDate instanceof Date).toBe(true);
			expect(item.eventDate.getTime()).toBe(original.items[i].eventDate.getTime());
		});
	});
});
