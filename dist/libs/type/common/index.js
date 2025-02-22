"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = void 0;
const bigint64_1 = require("./bigint64");
const biguint64_1 = require("./biguint64");
const bool_1 = require("./bool");
const bool_arr_1 = require("./bool-arr");
const date_1 = require("./date");
const float32_1 = require("./float32");
const float64_1 = require("./float64");
const int16_1 = require("./int16");
const int32_1 = require("./int32");
const int8_1 = require("./int8");
const uleb128_1 = require("./uleb128");
const none_1 = require("./none");
const or_1 = require("./or");
const str_1 = require("./str");
const uint16_1 = require("./uint16");
const uint32_1 = require("./uint32");
const uint8_1 = require("./uint8");
const undef_1 = require("./undef");
const sleb128_1 = require("./sleb128");
const enumerate_1 = require("./enumerate");
const optional_1 = require("./optional");
exports.t = {
    /**
     * @description Implementation of a union type. Use this when you need to assign two or more different types to a field.
     * @example t.or(t.str, t.int8, t.none)
     */
    or: or_1.or,
    /**
     *@description Represents an simple enumeration type. Use this to restrict a field to a predefined set of string values.
     * @example t.enumerate("CREATE", "READ", "UPDATE", "DELETE")
     */
    enumerate: enumerate_1.enumerate,
    /**
     * @description Represents an 8-bit unsigned integer. This type supports values ranging from 0 to 255.
     * @example 200
     */
    uint8: uint8_1.uint8,
    /**
     * @description Represents a 16-bit unsigned integer. This type supports values ranging from 0 to 65,535.
     * @example 50_000
     */
    uint16: uint16_1.uint16,
    /**
     * @description Represents a 32-bit unsigned integer. This type supports values ranging from 0 to 4,294,967,295.
     * @example 3_000_000_000
     */
    uint32: uint32_1.uint32,
    /**
     * @description Represents an 8-bit signed integer. This type supports values ranging from -128 to 127.
     * @example 42
     */
    int8: int8_1.int8,
    /**
     * @description Represents a 16-bit signed integer. This type supports values ranging from -32,768 to 32,767.
     * @example 12345
     */
    int16: int16_1.int16,
    /**
     * @description Represents a 32-bit signed integer. This type supports values ranging from -2,147,483,648 to 2,147,483,647.
     * @example 100_000
     */
    int32: int32_1.int32,
    /**
     * @description Represents a 32-bit floating-point number. This type provides approximately 7 decimal digits of precision and supports values in the range of ±3.4 × 10^38.
     * @example 12.345
     */
    float32: float32_1.float32,
    /**
     * @description Represents a 64-bit floating-point number. This type provides approximately 15-17 decimal digits of precision and supports values in the range of ±1.8 × 10^308.
     * @example 12345.6789
     */
    float64: float64_1.float64,
    /**
     * @description Represents a string with a maximum length of 4,294,967,295 bytes (up to 4,294,967,295 characters in UTF-8 or 2,147,483,647 characters in UTF-16).
     * @example "Hello, world!"
     */
    str: str_1.str,
    /**
     * @description Represents boolean value (true or false).
     * @example true
     */
    bool: bool_1.bool,
    /**
     * @description A compact version of a boolean array where each boolean takes only 1 bit.
     * @example [true, false, false, true]
     */
    boolArr: bool_arr_1.boolArr,
    /**
     * @description Represents large integers ranging from -(2^63) to 2^63 - 1. Only bigint values are supported.
     * @example -12345n
     */
    bigint64: bigint64_1.bigint64,
    /**
     * @description Represents large positive integers ranging from 0 to 2^64 - 1. Only bigint values are supported.
     * @example 12345n
     */
    biguint64: biguint64_1.biguint64,
    /**
     * @description Represents a JavaScript Date object
     * @example new Date("2000-11-12") // Sun Nov 12 2000 00:00:00
     */
    date: date_1.date,
    /**
     * @description Represents a type with a single value: `null`. Use it when a field must always contain `null`.
     * @example null
     */
    none: none_1.none,
    /**
     * @description Represents a type with a single value: `undefined`. Use it when a field must always contain `undefined`.
     * @example null
     */
    undef: undef_1.undef,
    /**
     * @description Represents large unsigned integers encoded in ULEB128 format. Supports positive integers ranging from 0 to an arbitrary large size using a variable-length encoding.
     * Only bigint values are supported.
     * @example 12345n
     */
    uleb128: uleb128_1.uleb128,
    /**
     * @description Represents large signed integers encoded in SLEB128 format. Supports both positive and negative integers of arbitrary size using a variable-length encoding with sign extension.
     * Only bigint values are supported.
     * @example -12345n
     */
    sleb128: sleb128_1.sleb128,
    /**
     * @description Represents optional type
     * @example - field: t.optional(t.str) // field?: string;
     */
    optional: optional_1.optional,
};
