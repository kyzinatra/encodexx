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

	it("should serialize and deserialize complex objects with t.or and t.schema", () => {
		const serializer = new Serializer({
			data: t.or(
				t.schema({
					type: t.enumerate("A"),
					value: t.str,
					details: t.schema({
						subtype: t.enumerate("X"),
						info: t.str,
					}),
				}),
				t.schema({
					type: t.enumerate("B"),
					value: t.int32,
					details: t.schema({
						subtype: t.enumerate("Y"),
						info: t.int32,
					}),
				})
			),
		});
		const original = {
			data: {
				type: "A" as const,
				value: "Test",
				details: {
					subtype: "X" as const,
					info: "Detail Info",
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle nested t.or types within t.schema", () => {
		const serializer = new Serializer({
			data: t.schema({
				main: t.or(
					t.schema({
						type: t.enumerate("C"),
						value: t.float64,
					}),
					t.schema({
						type: t.enumerate("D"),
						value: t.bool,
					})
				),
				extra: t.or(
					t.schema({
						description: t.str,
						count: t.int32,
					}),
					t.none
				),
			}),
		});
		const original = {
			data: {
				main: {
					type: "C" as const,
					value: 42.42,
				},
				extra: {
					description: "Extra Info",
					count: 10,
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should serialize and deserialize deeply nested t.or and t.schema types", () => {
		const serializer = new Serializer({
			config: t.schema({
				settings: t.or(
					t.schema({
						mode: t.enumerate("AUTO"),
						options: t.schema({
							enabled: t.bool,
							threshold: t.float32,
						}),
					}),
					t.schema({
						mode: t.enumerate("MANUAL"),
						options: t.schema({
							enabled: t.bool,
							level: t.int16,
						}),
					})
				),
				meta: t.or(
					t.schema({
						created: t.date,
						modified: t.optional(t.date),
					}),
					t.none
				),
			}),
		});
		const original = {
			config: {
				settings: {
					mode: "AUTO" as const,
					options: {
						enabled: true,
						threshold: 0.75,
					},
				},
				meta: {
					created: new Date(),
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
