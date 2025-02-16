import { Serializer, t } from "../src";
import { boolArr } from "../src/libs/type/common/bool-arr";

describe("t.or type", () => {
	it("should serialize and deserialize union types for info.title (string) and plots (float32 or string)", () => {
		const serializer = new Serializer({
			info: { title: t.or(t.str, t.int32, t.none) },
			plots: [t.or(t.float64, t.str)],
		});
		const original = {
			info: { title: "Test Title" },
			plots: [3.14, 2.71, "Plot A", "Plot B"],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should serialize and deserialize union types for info.title (int32) and plots (string)", () => {
		const serializer = new Serializer({
			info: { title: t.or(t.str, t.int32, t.none) },
			plots: [t.or(t.float32, t.str)],
		});
		const original = {
			info: { title: 42 },
			plots: ["Plot X", "Plot Y"],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should serialize and deserialize union types for info.title (null) and plots (mixed types)", () => {
		const serializer = new Serializer({
			info: { title: t.or(t.str, t.int32, t.none) },
			plots: [t.or(t.float64, t.str)],
		});
		const original = {
			info: { title: null },
			plots: [3.14, "Plot with string", 2.71],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle nested union types in an array of objects", () => {
		const serializer = new Serializer({
			items: [
				{
					description: t.or(t.str, t.none),
					value: t.or(t.int32, t.float64),
				},
			],
		});
		const original = {
			items: [
				{ description: "Item 1", value: 100 },
				{ description: null, value: 3.14 },
				{ description: "Item 3", value: 200 },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
	it("should handle nested or types", () => {
		const serializer = new Serializer({
			items: [
				{
					description: t.or(t.str, t.or(t.int8, t.or(t.none, t.or(boolArr)))),
				},
			],
		});
		const original = {
			items: [{ description: "Item 1" }, { description: null }, { description: [true, true, false, false] }],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
