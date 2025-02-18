// uint8.test.ts

import { Serializer, t } from "../src";

describe("versions tag tests", () => {
	it("should serialize with correct version", () => {
		const schema = { value: t.uint8 };
		const serializer1 = new Serializer(schema, { version: "33.2.1" });
		const serializer2 = new Serializer(schema, { version: "33.2.1" });

		const original = { value: 255 };
		const encoded1 = serializer1.encode(original);
		const decoded = serializer2.decode(encoded1);

		expect(decoded.value).toBe(255);
	});

	it("should serialize throw error with incorrect version", () => {
		const schema = { value: t.uint8 };
		const serializer1 = new Serializer(schema, { version: "33.2.1" });
		const serializer2 = new Serializer(schema, { version: "33.3.0" });

		const original = { value: 255 };
		const encoded1 = serializer1.encode(original);
		expect(() => serializer2.decode(encoded1)).toThrow();
	});
});
