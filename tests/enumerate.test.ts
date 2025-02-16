import { Serializer, t } from "../src";
import { boolArr } from "../src/libs/type/common/bool-arr";
import { ExtractObj } from "../src/types/types";

describe("t.or type", () => {
	it("should serialize and deserialize enumerate type for info.title and plots ", () => {
		const serializer = new Serializer({
			info: { title: t.enumerate("FOX", "TREE", "NEWS") },
			plots: [t.enumerate("A", "B")],
		});
		const original: ExtractObj<typeof serializer> = {
			info: { title: "TREE" as const },
			plots: ["A", "A", "A", "B"] as ("A" | "B")[],
		};

		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should serialize and deserialize enumerate type for one argument", () => {
		const serializer = new Serializer({
			info: { title: t.enumerate("FOX") },
			plots: [t.enumerate("AA")],
		});
		const original: ExtractObj<typeof serializer> = {
			info: { title: "FOX" },
			plots: ["AA"],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle nested enumerate type in an array of objects", () => {
		const serializer = new Serializer({
			items: [
				{
					value: {
						description: t.enumerate("AAA", "BBB", "CCC"),
					},
				},
			],
		});
		const original: ExtractObj<typeof serializer> = {
			items: [{ value: { description: "BBB" } }, { value: { description: "CCC" } }],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
