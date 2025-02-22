import { or } from "./or";
import { enumerate } from "./enumerate";
import { optional } from "./optional";
export declare const t: {
    /**
     * @description Implementation of a union type. Use this when you need to assign two or more different types to a field.
     * @example t.or(t.str, t.int8, t.none)
     */
    or: typeof or;
    /**
     *@description Represents an simple enumeration type. Use this to restrict a field to a predefined set of string values.
     * @example t.enumerate("CREATE", "READ", "UPDATE", "DELETE")
     */
    enumerate: typeof enumerate;
    /**
     * @description Represents an 8-bit unsigned integer. This type supports values ranging from 0 to 255.
     * @example 200
     */
    uint8: import("../custom-type").TCustomType<number>;
    /**
     * @description Represents a 16-bit unsigned integer. This type supports values ranging from 0 to 65,535.
     * @example 50_000
     */
    uint16: import("../custom-type").TCustomType<number>;
    /**
     * @description Represents a 32-bit unsigned integer. This type supports values ranging from 0 to 4,294,967,295.
     * @example 3_000_000_000
     */
    uint32: import("../custom-type").TCustomType<number>;
    /**
     * @description Represents an 8-bit signed integer. This type supports values ranging from -128 to 127.
     * @example 42
     */
    int8: import("../custom-type").TCustomType<number>;
    /**
     * @description Represents a 16-bit signed integer. This type supports values ranging from -32,768 to 32,767.
     * @example 12345
     */
    int16: import("../custom-type").TCustomType<number>;
    /**
     * @description Represents a 32-bit signed integer. This type supports values ranging from -2,147,483,648 to 2,147,483,647.
     * @example 100_000
     */
    int32: import("../custom-type").TCustomType<number>;
    /**
     * @description Represents a 32-bit floating-point number. This type provides approximately 7 decimal digits of precision and supports values in the range of ±3.4 × 10^38.
     * @example 12.345
     */
    float32: import("../custom-type").TCustomType<number>;
    /**
     * @description Represents a 64-bit floating-point number. This type provides approximately 15-17 decimal digits of precision and supports values in the range of ±1.8 × 10^308.
     * @example 12345.6789
     */
    float64: import("../custom-type").TCustomType<number>;
    /**
     * @description Represents a string with a maximum length of 4,294,967,295 bytes (up to 4,294,967,295 characters in UTF-8 or 2,147,483,647 characters in UTF-16).
     * @example "Hello, world!"
     */
    str: import("../custom-type").TCustomType<string>;
    /**
     * @description Represents boolean value (true or false).
     * @example true
     */
    bool: import("../custom-type").TCustomType<boolean>;
    /**
     * @description A compact version of a boolean array where each boolean takes only 1 bit.
     * @example [true, false, false, true]
     */
    boolArr: import("../custom-type").TCustomType<boolean[]>;
    /**
     * @description Represents large integers ranging from -(2^63) to 2^63 - 1. Only bigint values are supported.
     * @example -12345n
     */
    bigint64: import("../custom-type").TCustomType<bigint>;
    /**
     * @description Represents large positive integers ranging from 0 to 2^64 - 1. Only bigint values are supported.
     * @example 12345n
     */
    biguint64: import("../custom-type").TCustomType<bigint>;
    /**
     * @description Represents a JavaScript Date object
     * @example new Date("2000-11-12") // Sun Nov 12 2000 00:00:00
     */
    date: import("../custom-type").TCustomType<Date>;
    /**
     * @description Represents a type with a single value: `null`. Use it when a field must always contain `null`.
     * @example null
     */
    none: import("../custom-type").TCustomType<null>;
    /**
     * @description Represents a type with a single value: `undefined`. Use it when a field must always contain `undefined`.
     * @example null
     */
    undef: import("../custom-type").TCustomType<undefined>;
    /**
     * @description Represents large unsigned integers encoded in ULEB128 format. Supports positive integers ranging from 0 to an arbitrary large size using a variable-length encoding.
     * Only bigint values are supported.
     * @example 12345n
     */
    uleb128: import("../custom-type").TCustomType<bigint>;
    /**
     * @description Represents large signed integers encoded in SLEB128 format. Supports both positive and negative integers of arbitrary size using a variable-length encoding with sign extension.
     * Only bigint values are supported.
     * @example -12345n
     */
    sleb128: import("../custom-type").TCustomType<bigint>;
    /**
     * @description Represents optional type
     * @example - field: t.optional(t.str) // field?: string;
     */
    optional: typeof optional;
};
