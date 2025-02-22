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
});
