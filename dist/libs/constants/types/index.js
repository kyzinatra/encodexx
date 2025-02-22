"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES_RANGES = exports.NUMBER_TYPES = void 0;
exports.NUMBER_TYPES = {
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
};
exports.TYPES_RANGES = {
    int8: [-128, 127],
    int16: [-32768, 32767],
    int32: [-2147483648, 2147483647],
    uint8: [0, 255],
    uint16: [0, 65535],
    uint32: [0, 4294967295],
    float32: [-Infinity, Infinity],
    float64: [-Infinity, Infinity],
    bigint64: [-(2n ** 63n), 2n ** 63n - 1n],
    biguint64: [0n, 2n ** 64n - 1n],
};
