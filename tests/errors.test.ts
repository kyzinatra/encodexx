import { Serializer, t } from "../src";

describe("Invalid Data Tests", () => {
	it("should throw an error when int8 receives a non-number (string)", () => {
		const serializer = new Serializer({ value: t.int8 }, { strict: true });
		//@ts-expect-error
		expect(() => serializer.encode({ value: "not a number" })).toThrow();
	});

	it("should throw an error when int8 receives a number out of range", () => {
		const serializer = new Serializer({ value: t.int8 });
		expect(() => serializer.encode({ value: 128 })).toThrow();
	});

	it("should throw an error when uint8 receives a negative number", () => {
		const serializer = new Serializer({ value: t.uint8 });
		expect(() => serializer.encode({ value: -1 })).toThrow();
	});

	it("should throw an error when float32 receives a non-number", () => {
		const serializer = new Serializer({ value: t.float32 }, { strict: true });
		//@ts-expect-error
		expect(() => serializer.encode({ value: "3.14" })).toThrow();
	});
	it("should throw an error when uleb128 receives a non-number", () => {
		const serializer = new Serializer({ value: t.uleb128 }, { strict: true });
		//@ts-expect-error
		expect(() => serializer.encode({ value: "3.14" })).toThrow();
	});
	it("should throw an error when uleb128 receives a negative-number", () => {
		const serializer = new Serializer({ value: t.uleb128 }, { strict: true });
		expect(() => serializer.encode({ value: -124n })).toThrow();
	});
	it("should throw an error when sleb128 receives a non-number", () => {
		const serializer = new Serializer({ value: t.sleb128 }, { strict: true });
		//@ts-expect-error
		expect(() => serializer.encode({ value: "3.14" })).toThrow();
	});
	it("should throw an error when enumerate receives a wrong string", () => {
		const serializer = new Serializer({ value: t.enumerate("AA", "BB") }, { strict: true });
		//@ts-expect-error
		expect(() => serializer.encode({ value: "3.14" })).toThrow();
	});
	it("should throw an error when enumerate receives 0 arguments", () => {
		//@ts-expect-error
		const serializer = new Serializer({ value: t.enumerate() }, { strict: true });
		expect(() => serializer.encode({ value: "3.14" })).toThrow();
	});

	it("should throw an error when str receives a non-string", () => {
		const serializer = new Serializer({ value: t.str }, { strict: true });
		//@ts-expect-error
		expect(() => serializer.encode({ value: 12345 })).toThrow();
	});

	it("should throw an error when bool receives a non-boolean", () => {
		const serializer = new Serializer({ value: t.bool }, { strict: true });
		//@ts-expect-error
		expect(() => serializer.encode({ value: "true" })).toThrow();
	});

	it("should throw an error when boolArr receives a non-array", () => {
		const serializer = new Serializer({ values: t.boolArr }, { strict: true });
		//@ts-expect-error
		expect(() => serializer.encode({ values: true })).toThrow();
	});

	it("should throw an error when date receives a non-Date object", () => {
		const serializer = new Serializer({ value: t.date });
		//@ts-expect-error
		expect(() => serializer.encode({ value: "2021-01-01" })).toThrow();
	});

	it("should throw an error when none receives a non-null value", () => {
		const serializer = new Serializer({ value: t.none }, { strict: true });
		//@ts-expect-error
		expect(() => serializer.encode({ value: "not null" })).toThrow();
	});

	it("should throw an error when t.or does not match any union type", () => {
		const serializer = new Serializer({ value: t.or(t.str, t.int32, t.none) }, { strict: true });
		//@ts-expect-error
		expect(() => serializer.encode({ value: true })).toThrow();
	});

	it("should throw an error if a required field is missing in an object", () => {
		const schema = { user: { name: t.str, age: t.int32 } };
		const serializer = new Serializer(schema, { strict: true });
		//@ts-expect-error
		expect(() => serializer.encode({ user: { name: "Alice" } })).toThrow();
	});

	it("should throw an error if a nested object is missing required fields", () => {
		const schema = { profile: { contact: { email: t.str, phone: t.str } } };
		const serializer = new Serializer(schema, { strict: true });
		//@ts-expect-error
		expect(() => serializer.encode({ profile: { contact: { email: "alice@example.com" } } })).toThrow();
	});

	it("should throw an error if array elements do not conform to the schema", () => {
		const schema = { items: [{ id: t.int32, value: t.str }] };
		//@ts-expect-error
		const serializer = new Serializer(schema, { strict: true });
		expect(() => serializer.encode({ items: [{ id: 1, value: "A" }, { id: 2 }] })).toThrow();
	});

	it("should throw an error if an object is provided where an array is expected", () => {
		const schema = { list: [t.int8] };
		//@ts-expect-error
		const serializer = new Serializer(schema, { strict: true });
		expect(() => serializer.encode({ list: { a: 1, b: 2 } })).toThrow();
	});

	it("should throw an error if an array is provided where an object is expected", () => {
		const schema = { config: { key: t.str, value: t.int32 } };
		const serializer = new Serializer(schema, { strict: true });
		//@ts-expect-error
		expect(() => serializer.encode({ config: [{ key: "A", value: 1 }] })).toThrow();
	});

	it("should throw an error if a union type does not match any of the provided schemas", () => {
		const schema = {
			item: t.or(t.schema({ type: t.str, value: t.int32 }), t.schema({ name: t.str, count: t.int32 })),
		};
		const serializer = new Serializer(schema);
		//@ts-expect-error
		expect(() => serializer.encode({ item: { type: "test", count: 10 } })).toThrow();
	});

	it("should throw an error if a nested union type object is missing required fields", () => {
		const schema = {
			details: t.or(
				t.schema({ title: t.str, description: t.str }),
				t.schema({ code: t.int32, message: t.str })
			),
		};
		const serializer = new Serializer(schema);
		//@ts-expect-error
		expect(() => serializer.encode({ details: { title: "Hello" } })).toThrow();
	});

	it("should throw an error if the top-level key does not match the schema", () => {
		const schema = { settings: { enabled: t.bool, count: t.int16 } };
		const serializer = new Serializer(schema);
		//@ts-expect-error
		expect(() => serializer.encode({ config: { enabled: true, count: 5 } })).toThrow();
	});

	it("should throw an error when a required union field is completely missing", () => {
		const schema = { value: t.or(t.int32, t.str) };
		const serializer = new Serializer(schema);
		//@ts-expect-error
		expect(() => serializer.encode({})).toThrow();
	});
});
