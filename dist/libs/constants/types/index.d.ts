export declare const NUMBER_TYPES: {
    readonly int8: "int8";
    readonly int16: "int16";
    readonly int32: "int32";
    readonly uint32: "uint32";
    readonly uint16: "uint16";
    readonly uint8: "uint8";
    readonly float32: "float32";
    readonly float64: "float64";
    readonly bigint64: "bigint64";
    readonly biguint64: "biguint64";
};
export declare const TYPES_RANGES: {
    int8: number[];
    int16: number[];
    int32: number[];
    uint8: number[];
    uint16: number[];
    uint32: number[];
    float32: number[];
    float64: number[];
    bigint64: bigint[];
    biguint64: bigint[];
};
export type TNumberTypes = typeof NUMBER_TYPES;
