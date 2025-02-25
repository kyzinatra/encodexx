import { bigint64 } from "./bigint64";
import { biguint64 } from "./biguint64";
import { bool } from "./bool";
import { boolArr } from "./bool-arr";
import { date } from "./date";
import { float32 } from "./float32";
import { float64 } from "./float64";
import { int16 } from "./int16";
import { int32 } from "./int32";
import { int8 } from "./int8";
import { uleb128 } from "./uleb128";
import { none } from "./none";
import { or } from "./or";
import { str } from "./str";
import { uint16 } from "./uint16";
import { uint32 } from "./uint32";
import { uint8 } from "./uint8";
import { undef } from "./undef";
import { sleb128 } from "./sleb128";
import { enumerate } from "./enumerate";
import { optional } from "./optional";
import { schema } from "./schema";

export const t = {
	/**
	 * @description Implementation of a union type. Use this when you need to assign two or more different types to a field.
	 * @example t.or(t.str, t.int8, t.none)
	 */
	or,
	/**
	 *@description Represents an simple enumeration type. Use this to restrict a field to a predefined set of string values.
	 * @example t.enumerate("CREATE", "READ", "UPDATE", "DELETE")
	 */
	enumerate,
	/**
	 *@description Convert any schema to type. Be careful, it may hurts performance!
	 * @example t.or(t.schema([t.bool]), t.schema([t.int8]))
	 */
	schema,
	/**
	 * @description Represents an 8-bit unsigned integer. This type supports values ranging from 0 to 255.
	 * @example 200
	 */
	uint8,
	/**
	 * @description Represents a 16-bit unsigned integer. This type supports values ranging from 0 to 65,535.
	 * @example 50_000
	 */
	uint16,
	/**
	 * @description Represents a 32-bit unsigned integer. This type supports values ranging from 0 to 4,294,967,295.
	 * @example 3_000_000_000
	 */
	uint32,
	/**
	 * @description Represents an 8-bit signed integer. This type supports values ranging from -128 to 127.
	 * @example 42
	 */
	int8,
	/**
	 * @description Represents a 16-bit signed integer. This type supports values ranging from -32,768 to 32,767.
	 * @example 12345
	 */
	int16,
	/**
	 * @description Represents a 32-bit signed integer. This type supports values ranging from -2,147,483,648 to 2,147,483,647.
	 * @example 100_000
	 */
	int32,
	/**
	 * @description Represents a 32-bit floating-point number. This type provides approximately 7 decimal digits of precision and supports values in the range of ±3.4 × 10^38.
	 * @example 12.345
	 */
	float32,
	/**
	 * @description Represents a 64-bit floating-point number. This type provides approximately 15-17 decimal digits of precision and supports values in the range of ±1.8 × 10^308.
	 * @example 12345.6789
	 */
	float64,
	/**
	 * @description Represents a string with a maximum length of 4,294,967,295 bytes (up to 4,294,967,295 characters in UTF-8 or 2,147,483,647 characters in UTF-16).
	 * @example "Hello, world!"
	 */
	str,
	/**
	 * @description Represents boolean value (true or false).
	 * @example true
	 */
	bool,
	/**
	 * @description A compact version of a boolean array where each boolean takes only 1 bit.
	 * @example [true, false, false, true]
	 */
	boolArr,
	/**
	 * @description Represents large integers ranging from -(2^63) to 2^63 - 1. Only bigint values are supported.
	 * @example -12345n
	 */
	bigint64,
	/**
	 * @description Represents large positive integers ranging from 0 to 2^64 - 1. Only bigint values are supported.
	 * @example 12345n
	 */
	biguint64,
	/**
	 * @description Represents a JavaScript Date object
	 * @example new Date("2000-11-12") // Sun Nov 12 2000 00:00:00
	 */
	date,
	/**
	 * @description Represents a type with a single value: `null`. Use it when a field must always contain `null`.
	 * @example null
	 */
	none,
	/**
	 * @description Represents a type with a single value: `undefined`. Use it when a field must always contain `undefined`.
	 * @example null
	 */
	undef,
	/**
	 * @description Represents large unsigned integers encoded in ULEB128 format. Supports positive integers ranging from 0 to an arbitrary large size using a variable-length encoding.
	 * Only bigint values are supported.
	 * @example 12345n
	 */
	uleb128,

	/**
	 * @description Represents large signed integers encoded in SLEB128 format. Supports both positive and negative integers of arbitrary size using a variable-length encoding with sign extension.
	 * Only bigint values are supported.
	 * @example -12345n
	 */
	sleb128,
	/**
	 * @description Represents optional type
	 * @example - field: t.optional(t.str) // field?: string;
	 */
	optional,
};
