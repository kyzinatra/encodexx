import { ArraySingle, customType, Serializer, t } from "../src";

describe("Serializer.equal", () => {
	it("should return true for two empty schemas", () => {
		const schema1 = {};
		const schema2 = {};

		expect(Serializer.equal(schema1, schema2)).toBe(true);
	});

	it("should return false if one schema is empty and the other is not", () => {
		const schema1 = {};
		const schema2 = { value: t.int8 };

		expect(Serializer.equal(schema1, schema2)).toBe(false);
		expect(Serializer.equal(schema2, schema1)).toBe(false);
	});

	it("should return true for two schemas with one identical simple field", () => {
		const schema1 = { value: t.int8 };
		const schema2 = { value: t.int8 };

		expect(Serializer.equal(schema1, schema2)).toBe(true);
	});

	it("should return false if a single field has different types", () => {
		const schema1 = { value: t.int8 };
		const schema2 = { value: t.int16 }; // different type

		expect(Serializer.equal(schema1, schema2)).toBe(false);
	});

	it("should return false if a field is optional in one schema but not in the other", () => {
		const schema1 = { value: t.int8 };
		const schema2 = { value: t.optional(t.int8) };

		expect(Serializer.equal(schema1, schema2)).toBe(false);
	});

	it("should return true for two arrays with the same element type", () => {
		const schema1 = { values: [t.int8] };
		const schema2 = { values: [t.int8] };

		expect(
			Serializer.equal(schema1 as ArraySingle<typeof schema1>, schema2 as ArraySingle<typeof schema2>)
		).toBe(true);
	});

	it("should return false if array element types differ", () => {
		const schema1 = { values: [t.int8] };
		const schema2 = { values: [t.int16] };

		expect(
			Serializer.equal(schema1 as ArraySingle<typeof schema1>, schema2 as ArraySingle<typeof schema2>)
		).toBe(false);
	});

	it("should return true for two schemas with identical nested objects", () => {
		const schema1 = {
			obj: {
				a: t.int8,
				b: t.int16,
				nested: {
					c: t.uint8,
				},
			},
		};
		const schema2 = {
			obj: {
				a: t.int8,
				b: t.int16,
				nested: {
					c: t.uint8,
				},
			},
		};

		expect(Serializer.equal(schema1, schema2)).toBe(true);
	});

	it("should return false for different nested objects", () => {
		const schema1 = {
			obj: {
				a: t.int8,
				nested: {
					c: t.uint8,
				},
			},
		};
		const schema2 = {
			obj: {
				a: t.int8,
				nested: {
					c: t.uint16, // different type
				},
			},
		};

		expect(Serializer.equal(schema1, schema2)).toBe(false);
	});

	it("should return false if a nested object has a different number of keys", () => {
		const schema1 = {
			obj: {
				a: t.int8,
				nested: {
					c: t.uint8,
					d: t.int8,
				},
			},
		};
		const schema2 = {
			obj: {
				a: t.int8,
				nested: {
					c: t.uint8,
					// missing d
				},
			},
		};

		expect(Serializer.equal(schema1, schema2)).toBe(false);
	});

	it("should return true for multiple levels of nesting if they match", () => {
		const schema1 = {
			level1: {
				level2: {
					level3: {
						value: t.float32,
					},
				},
			},
		};
		const schema2 = {
			level1: {
				level2: {
					level3: {
						value: t.float32,
					},
				},
			},
		};

		expect(Serializer.equal(schema1, schema2)).toBe(true);
	});

	it("should return false if there is a mismatch in a deeply nested field", () => {
		const schema1 = {
			level1: {
				level2: {
					level3: {
						value: t.float32,
					},
				},
			},
		};
		const schema2 = {
			level1: {
				level2: {
					level3: {
						value: t.float64, // different type
					},
				},
			},
		};

		expect(Serializer.equal(schema1, schema2)).toBe(false);
	});

	it("should return false if key order is different and the types do not match", () => {
		const schema1 = {
			a: t.int8,
			b: t.int8,
		};
		const schema2 = {
			b: t.int8,
			a: t.int16, // mismatched type
		};

		expect(Serializer.equal(schema1, schema2)).toBe(false);
	});

	it("should return true if key order is different but types match", () => {
		const schema1 = {
			a: t.int8,
			b: t.int16,
		};
		const schema2 = {
			b: t.int16,
			a: t.int8,
		};

		expect(Serializer.equal(schema1, schema2)).toBe(true);
	});

	it("should return true for the same custom types", () => {
		const customType1 = customType({
			decode(buff) {
				return buff.readFloat64();
			},
			encode(buffer, val) {
				buffer.writeFloat64(val);
			},
			guard(data): data is number {
				return typeof data === "number";
			},
			name: "double64",
		});

		const schema1 = { myValue: customType1 };
		const schema2 = { myValue: customType1 };

		expect(Serializer.equal(schema1, schema2)).toBe(true);
	});

	it("should return false if custom types differ", () => {
		const customType1 = customType({
			name: "double64",
			decode(buff) {
				return buff.readFloat64();
			},
			encode(buffer, val) {
				buffer.writeFloat64(val);
			},
			guard(data): data is number {
				return typeof data === "number";
			},
		});
		const customType2 = customType({
			name: "float64-other",
			decode(buff) {
				return buff.readFloat64();
			},
			encode(buffer, val) {
				buffer.writeFloat64(val);
			},
			guard(data): data is number {
				return typeof data === "number";
			},
		});

		const schema1 = { myValue: customType1 };
		const schema2 = { myValue: customType2 };

		expect(Serializer.equal(schema1, schema2)).toBe(false);
	});
});
