import { Serializer, t } from "../src";
import { boolArr } from "../src/libs/type/common/bool-arr";

describe("t.or type", () => {
	it("should serialize and deserialize union types for info.title (string) and plots (float32 or string)", () => {
		const serializer = new Serializer({
			info: { title: t.or(t.str, t.int32, t.none) },
			plots: t.schema(
				{
					key: t.str,
					value: t.int16,
				},
				"key"
			),
		});
		const original = {
			info: { title: "Test Title" },
			plots: { key: "val", value: 12 },
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should serialize and deserialize union types for info.title (int32) and plots (string)", () => {
		const serializer = new Serializer({
			info: t.optional(t.schema({ title: t.or(t.str, t.int32, t.none) })),
			plots: t.optional(t.schema([t.or(t.float32, t.str)])),
		});
		const original = {};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should serialize and deserialize union types for info.title (null) and plots (mixed types)", () => {
		const serializer = new Serializer({
			plots: [
				t.or(
					t.schema({ type: t.enumerate("USER"), name: t.str, x: t.int32 }, "type"),
					t.schema({ type: t.enumerate("ADMIN"), content: t.str, y: t.int32 }, "type")
				),
			],
		});
		const original = {
			plots: [
				{
					type: "ADMIN" as const,
					content: "fas",
					y: 124,
				},
				{
					type: "ADMIN" as const,
					content: "fas",
					y: 124,
				},
				{
					type: "ADMIN" as const,
					content: "fas",
					y: 124,
				},
				{
					type: "USER" as const,
					name: "asf",
					x: 124,
				},
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle nested union types in an array of objects", () => {
		const serializer = new Serializer(
			t.schema({
				items: [
					{
						description: t.or(t.str, t.none),
						value: t.or(t.int32, t.float64),
					},
				],
			})
		);
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
			items: t.or(
				t.schema([
					{
						description: t.or(t.str, t.or(t.int8, t.or(t.none, t.or(boolArr)))),
					},
				]),
				t.int16,
				t.boolArr,
				t.schema([t.int32])
			),
		});
		const original = {
			items: [{ description: "Item 1" }, { description: null }, { description: [true, true, false, false] }],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
