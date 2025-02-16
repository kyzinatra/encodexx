import { ArraySingle, Serializer, t } from "../src";

describe("Complex Integration Tests", () => {
	it("should serialize and deserialize a complex nested structure using all types", () => {
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

		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		// Check user fields
		expect(decoded.user.id).toEqual(original.user.id);
		expect(decoded.user.name).toEqual(original.user.name);
		expect(decoded.user.age).toEqual(original.user.age);
		expect(decoded.user.status).toEqual(original.user.status);
		expect(decoded.user.active).toEqual(original.user.active);
		expect(decoded.user.tags).toEqual(original.user.tags);
		expect(decoded.user.createdAt.getTime()).toEqual(original.user.createdAt.getTime());

		expect(decoded.user.ratings.length).toEqual(original.user.ratings.length);
		for (let i = 0; i < original.user.ratings.length; i++) {
			expect(decoded.user.ratings[i]).toBeCloseTo(original.user.ratings[i], 5);
		}
		expect(decoded.user.logs).toEqual(original.user.logs);

		// Check metadata
		expect(decoded.user.metadata.bigNum).toEqual(original.user.metadata.bigNum);
		expect(decoded.user.metadata.bigUnsigned).toEqual(original.user.metadata.bigUnsigned);
		expect(decoded.user.metadata.score).toEqual(original.user.metadata.score);
		expect(decoded.user.metadata.flags).toEqual(original.user.metadata.flags);

		expect(decoded.user.metadata.details.height).toBeCloseTo(original.user.metadata.details.height, 10);
		expect(decoded.user.metadata.details.weight).toBeCloseTo(original.user.metadata.details.weight, 10);
		expect(decoded.user.metadata.details.comment).toEqual(original.user.metadata.details.comment);

		expect(decoded.user.metadata.history.length).toEqual(original.user.metadata.history.length);
		for (let i = 0; i < original.user.metadata.history.length; i++) {
			const origHist = original.user.metadata.history[i];
			const decHist = decoded.user.metadata.history[i];
			expect(decHist.change).toEqual(origHist.change);
			if (typeof origHist.value === "number" && !Number.isInteger(origHist.value)) {
				expect(decHist.value).toBeCloseTo(origHist.value, 5);
			} else {
				expect(decHist.value).toEqual(origHist.value);
			}
		}

		// Check items array
		expect(decoded.items.length).toEqual(original.items.length);
		for (let i = 0; i < original.items.length; i++) {
			const origItem = original.items[i];
			const decItem = decoded.items[i];
			expect(decItem.id).toEqual(origItem.id);
			if (typeof origItem.value === "number" && !Number.isInteger(origItem.value)) {
				expect(decItem.value).toBeCloseTo(origItem.value, 5);
			} else {
				expect(decItem.value).toEqual(origItem.value);
			}
			expect(decItem.valid).toEqual(origItem.valid);
			expect(decItem.numbers).toEqual(origItem.numbers);
		}

		// Check extra field
		expect(decoded.extra).toEqual(original.extra);
	});

	it("should serialize and deserialize an atypical nested structure correctly", () => {
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
			data: [
				{
					id: t.bigint64,
					value: t.or(t.int32, t.float32, t.str),
					nested: {
						key: t.or(t.uint16, t.none),
						list: [t.or(t.bool, t.boolArr, t.or(t.str, t.int8))],
					},
				},
			],
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
						key: null,
						list: ["nested string", false],
					},
				},
			],
			extra: -5,
		};

		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);

		// Validate config
		expect(decoded.config.version).toEqual(original.config.version);
		expect(decoded.config.options.flagSet).toEqual(original.config.options.flagSet);
		expect(decoded.config.options.limits.min).toEqual(original.config.options.limits.min);
		expect(decoded.config.options.limits.max).toEqual(original.config.options.limits.max);
		expect(decoded.config.schedule.length).toEqual(original.config.schedule.length);
		for (let i = 0; i < original.config.schedule.length; i++) {
			expect(new Date(decoded.config.schedule[i].date).getTime()).toEqual(
				new Date(original.config.schedule[i].date).getTime()
			);
			expect(decoded.config.schedule[i].events.length).toEqual(original.config.schedule[i].events.length);
			for (let j = 0; j < original.config.schedule[i].events.length; j++) {
				const origEvent = original.config.schedule[i].events[j];
				const decEvent = decoded.config.schedule[i].events[j];
				expect(decEvent.type).toEqual(origEvent.type);
				expect(decEvent.description).toEqual(origEvent.description);
				expect(decEvent.active).toEqual(origEvent.active);
				expect(decEvent.metrics.load).toBeCloseTo(origEvent.metrics.load, 5);
				expect(decEvent.metrics.performance).toBeCloseTo(origEvent.metrics.performance, 10);
			}
		}

		// Validate data
		expect(decoded.data.length).toEqual(original.data.length);
		for (let i = 0; i < original.data.length; i++) {
			const origData = original.data[i];
			const decData = decoded.data[i];
			expect(decData.id).toEqual(origData.id);
			if (typeof origData.value === "number") {
				expect(decData.value).toBeCloseTo(origData.value, 5);
			} else {
				expect(decData.value).toEqual(origData.value);
			}
			expect(decData.nested.key).toEqual(origData.nested.key);
			expect(decData.nested.list.length).toEqual(origData.nested.list.length);
			for (let k = 0; k < origData.nested.list.length; k++) {
				const origElem = origData.nested.list[k];
				const decElem = decData.nested.list[k];
				expect(decElem).toEqual(origElem);
			}
		}

		// Validate extra field
		expect(decoded.extra).toEqual(original.extra);
	});
});
