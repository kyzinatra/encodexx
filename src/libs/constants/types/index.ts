export const NUMBER_TYPES = {
	int8: "int8",
	int16: "int16",
	int32: "int32",
	uint32: "uint32",
	uint16: "uint16",
	uint8: "uint8",
	float32: "float32",
	float64: "float64",
	bigint64: "bigint64",
	biguint64: "biguint64",
} as const;

export const TYPES_RANGES = {
	int8: [-128, 127],
	int16: [-32_768, 32_767],
	int32: [-2_147_483_648, 2_147_483_647],
	uint8: [0, 255],
	uint16: [0, 65_535],
	uint32: [0, 4_294_967_295],
	float32: [-Infinity, Infinity],
	float64: [-Infinity, Infinity],
	bigint64: [-(2n ** 63n), 2n ** 63n - 1n],
	biguint64: [0n, 2n ** 64n - 1n],
};

export type TNumberTypes = typeof NUMBER_TYPES;
