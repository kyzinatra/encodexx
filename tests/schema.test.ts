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

describe("t.or type with t.schema and key arguments", () => {
	it("should serialize and deserialize multiple objects with different keys", () => {
		const serializer = new Serializer({
			entries: t.or(
				t.schema(
					{
						type: t.enumerate("TYPE_A"),
						id: t.str,
						value: t.int32,
					},
					"type"
				),
				t.schema(
					{
						type: t.enumerate("TYPE_B"),
						id: t.str,
						description: t.str,
					},
					"type"
				)
			),
		});
		const original = {
			entries: {
				type: "TYPE_A" as const,
				id: "123",
				value: 42,
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);

		const original2 = {
			entries: {
				type: "TYPE_B" as const,
				id: "456",
				description: "A description",
			},
		};
		const encoded2 = serializer.encode(original2);
		const decoded2 = serializer.decode(encoded2);
		expect(decoded2).toEqual(original2);
	});

	it("should handle nested schemas with different keys", () => {
		const serializer = new Serializer({
			data: t.schema(
				{
					main: t.or(
						t.schema(
							{
								type: t.enumerate("MAIN_A"),
								value: t.float64,
							},
							"type"
						),
						t.schema(
							{
								type: t.enumerate("MAIN_B"),
								flag: t.bool,
							},
							"type"
						)
					),
					extra: t.or(
						t.schema(
							{
								description: t.str,
								count: t.int32,
							},
							"description"
						),
						t.none
					),
				},
				"main"
			),
		});
		const original = {
			data: {
				main: {
					type: "MAIN_A" as const,
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

		const original2 = {
			data: {
				main: {
					type: "MAIN_B" as const,
					flag: true,
				},
				extra: null,
			},
		};
		const encoded2 = serializer.encode(original2);
		const decoded2 = serializer.decode(encoded2);
		expect(decoded2).toEqual(original2);
	});

	it("should serialize and deserialize deeply nested schemas with different keys", () => {
		const serializer = new Serializer({
			config: t.schema(
				{
					settings: t.or(
						t.schema(
							{
								mode: t.enumerate("AUTO"),
								options: t.schema(
									{
										enabled: t.bool,
										threshold: t.float32,
									},
									"enabled"
								),
							},
							"mode"
						),
						t.schema(
							{
								mode: t.enumerate("MANUAL"),
								options: t.schema(
									{
										enabled: t.bool,
										level: t.int16,
									},
									"enabled"
								),
							},
							"mode"
						)
					),
					meta: t.or(
						t.schema(
							{
								created: t.date,
								modified: t.optional(t.date),
							},
							"created"
						),
						t.none
					),
				},
				"settings"
			),
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

		const original2 = {
			config: {
				settings: {
					mode: "MANUAL" as const,
					options: {
						enabled: false,
						level: 5,
					},
				},
				meta: null,
			},
		};
		const encoded2 = serializer.encode(original2);
		const decoded2 = serializer.decode(encoded2);
		expect(decoded2).toEqual(original2);
	});
});
