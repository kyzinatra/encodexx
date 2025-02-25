import { ArraySingle, Serializer, t } from "../src";

describe("Complex Integration Tests", () => {
	it("should check a complex nested structure using all types correctly", () => {
		const serializer = new Serializer({
			user: {
				id: t.or(t.int32, t.none),
				name: t.str,
				age: t.int8,
				status: t.uint8,
				ratings: [t.float32],
				active: t.bool,
				tags: [t.str],
				createdAt: t.date,
				logs: [t.or(t.str, t.none, t.undef)],
				metadata: {
					bigNum: t.bigint64,
					bigUnsigned: t.biguint64,
					score: t.uint16,
					flags: t.boolArr,
					details: {
						height: t.float64,
						weight: t.float64,
						comment: t.or(t.str, t.none),
					},
					history: [
						{
							change: t.or(t.int16, t.str),
							value: t.or(t.int32, t.float32),
						},
					],
				},
			},
			items: [
				{
					id: t.int16,
					value: t.or(t.float32, t.str, t.int32),
					valid: t.bool,
					numbers: [t.uint32],
				},
			],
			extra: t.or(t.str, t.int8),
		});

		const original = {
			user: {
				id: 12345,
				name: "Alice",
				age: 30,
				status: 200,
				ratings: [3.14, 2.71, 1.41],
				active: true,
				tags: ["admin", "user"],
				createdAt: new Date("2023-02-15T12:00:00Z"),
				logs: ["Log1", null, "Log3", undefined],
				metadata: {
					bigNum: 987654321012345678n,
					bigUnsigned: 12345678901234567890n,
					score: 5000,
					flags: [true, false, true, true, false],
					details: {
						height: 175.5,
						weight: 70.2,
						comment: "No issues",
					},
					history: [
						{ change: 10, value: 1000 },
						{ change: "updated", value: 2.718 },
					],
				},
			},
			items: [
				{
					id: 1,
					value: 3.14,
					valid: true,
					numbers: [100, 200, 300],
				},
				{
					id: 2,
					value: "item2",
					valid: false,
					numbers: [400, 500],
				},
			],
			extra: "extra info",
		};
		expect(serializer.guard(original)).toBeTruthy();
	});

	it("should check an atypical nested structure correctly", () => {
		const schema = {
			config: {
				version: t.or(t.str, t.int32),
				options: {
					flagSet: t.boolArr,
					limits: {
						min: t.or(t.int32, t.none),
						max: t.or(t.int32, t.none),
					},
				},
				schedule: [
					{
						date: t.date,
						events: [
							{
								type: t.or(t.str, t.int8),
								description: t.or(t.str, t.none),
								metrics: {
									load: t.float32,
									performance: t.float64,
								},
								active: t.bool,
							},
						],
					},
				],
			},
			data: t.optional([
				{
					id: t.bigint64,
					value: t.or(t.int32, t.float32, t.str),
					nested: {
						key: t.or(t.uint16, t.none, t.enumerate("KEY1", "KEY2")),
						list: [t.or(t.bool, t.boolArr, t.or(t.str, t.int8))],
					},
				},
			]),
			extra: t.or(t.str, t.int8),
		};

		const serializer = new Serializer(schema as ArraySingle<typeof schema>);

		const original = {
			config: {
				version: "v1.2.3",
				options: {
					flagSet: [true, false, true, true, false, false, true, false],
					limits: {
						min: -100,
						max: 1000,
					},
				},
				schedule: [
					{
						date: new Date("2024-01-01T10:00:00Z"),
						events: [
							{
								type: 42,
								description: null,
								metrics: {
									load: 0.75,
									performance: 123456.789012345,
								},
								active: false,
							},
							{
								type: "Maintenance",
								description: "Quarterly check",
								metrics: {
									load: 0.55,
									performance: 98765.4321,
								},
								active: true,
							},
						],
					},
					{
						date: new Date("2024-06-15T15:30:00Z"),
						events: [
							{
								type: "Update",
								description: "System update",
								metrics: {
									load: 0.85,
									performance: 54321.1234,
								},
								active: true,
							},
						],
					},
				],
			},
			data: [
				{
					id: 1234567890123456789n,
					value: 256,
					nested: {
						key: 65535,
						list: [true, [false, true, false], "example", -12],
					},
				},
				{
					id: -987654321098765432n,
					value: "High",
					nested: {
						key: "KEY2" as const,
						list: ["nested string", false],
					},
				},
			],
			extra: -5,
		};

		expect(serializer.guard(original)).toBeTruthy();
	});

	it("should check an wrong atypical nested structure correctly", () => {
		const schema = {
			config: {
				version: t.or(t.str, t.int32),
				options: {
					flagSet: t.boolArr,
					limits: {
						min: t.or(t.int32, t.none),
						max: t.or(t.int32, t.none),
					},
				},
				schedule: [
					{
						date: t.date,
						events: [
							{
								type: t.or(t.str, t.int8),
								description: t.or(t.str, t.none),
								metrics: {
									load: t.float32,
									performance: t.float64,
								},
								active: t.bool,
							},
						],
					},
				],
			},
			data: t.optional([
				{
					id: t.bigint64,
					value: t.or(t.int32, t.float32, t.str),
					nested: {
						key: t.or(t.uint16, t.none, t.enumerate("KEY1", "KEY2")),
						list: [t.or(t.bool, t.boolArr, t.or(t.str, t.int8))],
					},
				},
			]),
			extra: t.or(t.str, t.int8),
		};

		const serializer = new Serializer(schema as ArraySingle<typeof schema>);

		const original = {
			config: {
				version: "v1.2.3",
				options: {
					flagSet: [true, false, true, true, false, false, true, false],
					limits: {
						min: -100,
						max: 1000,
					},
				},
				schedule: [
					{
						date: new Date("2024-01-01T10:00:00Z"),
						events: [
							{
								type: 42,
								description: null,
								metrics: {
									load: 0.75,
									performance: 123456.789012345,
								},
								active: false,
							},
							{
								type: "Maintenance",
								description: "Quarterly check",
								metrics: {
									load: 0.55,
									performance: 98765.4321,
								},
								active: true,
							},
						],
					},
					{
						date: new Date("2024-06-15T15:30:00Z"),
						events: [
							{
								type: "Update",
								description: "System update",
								metrics: {
									load: 0.85,
									performance: 54321.1234,
								},
								active: true,
							},
						],
					},
				],
			},
			data: [
				{
					id: 1234567890123456789n,
					value: 256,
					nested: {
						key: 65535,
						list: [true, [false, true, false], "example", -12],
					},
				},
				{
					id: -987654321098765432n,
					value: "High",
					nested: {
						key: "KEY233" as const,
						list: ["nested string", false],
					},
				},
			],
			extra: -5,
		};

		expect(serializer.guard(original)).toBeFalsy();
	});

	it("should check an array optional types optional correctly", () => {
		const serializer = new Serializer(
			t.optional([
				{
					user: t.optional({
						age: t.int16,
						name: t.str,
					}),
				},
			])
		);
		const original = [
			{
				user: {
					age: 1200000,
					name: "str",
				},
			},
		];
		const original2 = [{}];
		expect(serializer.guard(undefined)).toBeTruthy();
		expect(serializer.guard(original2)).toBeTruthy();
		expect(serializer.guard(original)).toBeFalsy();
	});
});
