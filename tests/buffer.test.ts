import { Serializer, t } from "../src";

export const serializer = new Serializer(
	[
		{
			xValue: t.float64,
			yValue: t.float64,
			zValue: t.optional(t.float64),
		},
	],
	{ strict: true }
);

describe("Serializer Jest Tests", () => {
	it("encodes and decodes the full array correctly", () => {
		const response = new Array(100);
		response.fill({ xValue: 12.54334, yValue: 2453.342, zValue: 999 });
		const encoded = serializer.encode(response).uint8Array;
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(response);
	});

	it("handles optional fields missing", () => {
		const response = new Array(50).fill({ xValue: 1.234, yValue: 5.678 }); // zValue missing
		const encoded = serializer.encode(response).uint8Array;
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(response);
	});

	it("encodes and decodes an empty array", () => {
		const response: any[] = [];
		const encoded = serializer.encode(response).uint8Array;
		const decoded = serializer.decode(encoded);
		expect(decoded).toEqual(response);
	});

	it("throws an error when a required field is missing", () => {
		const invalidResponse = [{ yValue: 5.678, zValue: 10 }]; // xValue is missing
		expect(() => {
			// @ts-ignore
			serializer.encode(invalidResponse);
		}).toThrow();
	});
});
