import { Serializer, t } from "../src";

describe("t.str type", () => {
	it("should serialize and deserialize a basic string correctly", () => {
		const serializer = new Serializer({ value: t.str });
		const original = { value: "Hello, world!" };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should serialize and deserialize an empty string correctly", () => {
		const serializer = new Serializer({ value: t.str });
		const original = { value: "" };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe("");
	});

	it("should serialize and deserialize strings with special characters correctly", () => {
		const serializer = new Serializer({ value: t.str });
		const original = { value: "¡Hola! Привет! 你好! 😊" };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.value).toBe(original.value);
	});

	it("should handle an array of strings correctly", () => {
		const serializer = new Serializer({ values: [t.str] });
		const original = { values: ["Hello", "world", "", "Test string", "Another string"] };
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded.values).toEqual(original.values);
	});

	it("should handle nested objects with string fields correctly", () => {
		const schema = {
			data: {
				title: t.str,
				description: t.str,
				nested: {
					note: t.str,
				},
			},
		};
		const serializer = new Serializer(schema);
		const original = {
			data: {
				title: "Title",
				description: "This is a description.",
				nested: {
					note: "A nested note.",
				},
			},
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});

	it("should handle an array of objects with string fields correctly", () => {
		const serializer = new Serializer({
			items: [
				{
					name: t.str,
					value: t.str,
				},
			],
		});
		const original = {
			items: [
				{ name: "Item 1", value: "Value 1" },
				{ name: "Item 2", value: "Value 2" },
			],
		};
		const encoded = serializer.encode(original);
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(original);
	});
});
