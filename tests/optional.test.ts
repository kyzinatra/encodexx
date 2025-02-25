import { Serializer, t } from "../src";

describe("t.optional type", () => {
	it("should serialize and deserialize optional types for info.title (string) ", () => {
		const serializer = new Serializer({
			info: { title: t.optional(t.str), context: t.str },
			name: t.optional(t.sleb128),
			name2: t.optional(t.sleb128),
		});
		const original = {
			info: { context: "asfasf" },
			name: 3123512340895680394901234905129034901523n,
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should serialize and deserialize optional types with object schema", () => {
		const serializer = new Serializer({
			info: t.optional({ title: t.optional(t.str), context: t.str }),
			info1: t.optional({ title: t.optional(t.str), context: t.str }),
			info2: t.optional({ title: t.optional(t.str), context: t.str }),
		});
		const original = {
			info: { context: "asfasf" },
			info2: { context: "asfasf", title: "afss" },
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should serialize and deserialize optional types with array schema", () => {
		const serializer = new Serializer({
			info: t.optional([{ title: t.optional(t.str), context: t.str }]),
			info2: t.optional([{ title: t.optional(t.str), context: t.str }]),
		});
		const original = {
			info: [{ context: "asfasf" }, { context: "asfasf", title: "afss" }, { context: "asfasf" }],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should serialize and deserialize only optional types", () => {
		const serializer = new Serializer(t.optional([{ title: t.optional(t.str), context: t.str }]));
		const original = [{ context: "asfasf" }, { context: "asfasf", title: "afss" }, { context: "asfasf" }];
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
		expect(serializer.decode(serializer.encode(undefined))).toEqual(undefined);
	});

	it("should serialize and deserialize array of optional types", () => {
		const serializer = new Serializer([t.optional([{ age: t.bigint64 }])]);
		const original = [
			[{ age: 12n }, { age: 125953423n }, { age: 12390581289035n }],
			[{ age: 12n }, { age: 125953423n }, { age: 12390581289035n }],
			[{ age: 12n }, { age: 125953423n }, { age: 12390581289035n }],
		];
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
