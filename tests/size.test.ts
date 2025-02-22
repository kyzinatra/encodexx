import { Serializer, t } from "../src";

describe("Encoded Buffer Size Tests", () => {
	it("should produce a sufficiently large buffer for a large array of simple objects", () => {
		const serializer = new Serializer({
			items: [
				{
					id: t.int32,
					name: t.str,
					active: t.bool,
				},
			],
		});
		const original = {
			items: Array.from({ length: 100000 }, (_, i) => ({
				id: i,
				name: `Item ${i}`,
				active: i % 2 === 0,
			})),
		};

		const encoded = serializer.encode(original);
		expect(encoded.length).toEqual(1888894);

		const decoded = serializer.decode(encoded);
		expect(decoded.items.length).toEqual(100000);
	});

	it("should produce a sufficiently large buffer for a nested structure with large arrays of strings", () => {
		const serializer = new Serializer({
			paragraphs: [t.str],
			notes: {
				list: [t.str],
			},
		});
		const original = { paragraphs: [] as string[], notes: { list: [] as string[] } };

		for (let i = 0; i < 500; i++) {
			original.paragraphs.push(
				`Paragraph ${i}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum metus sit amet dolor vestibulum, id tristique lorem fermentum.`
			);
			original.notes.list.push(
				`Note ${i}: Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer nec odio.`
			);
		}

		const encoded = serializer.encode(original);
		expect(encoded.length).toEqual(137288);

		const decoded = serializer.decode(encoded);
		expect(decoded.paragraphs.length).toEqual(500);
		expect(decoded.notes.list.length).toEqual(500);
	});
});
