<p align="center">
  <img src="https://raw.githubusercontent.com/kyzinatra/encodexx/master/public/logo.svg" alt="logo" width="200px" />
  <h1 align="center">Encodexx</h1>
</p>

[![Build Size](https://img.shields.io/bundlephobia/minzip/encodexx?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=encodexx)
![Dependencies](https://badgen.net/bundlephobia/dependency-count/encodexx)
[![License](https://img.shields.io/github/license/kyzinatra/encodexx)](https://github.com/kyzinatra/encodexx/blob/master/LICENSE)

# Table of Contents

- [What is Encodexx](#what-is-encodexx)
- [Defining a Schema](#defining-a-schema)
- [Encoding an Object](#encoding-an-object)
- [Decoding an Object](#decoding-an-object)
- [Schema Structure](#schema-structure)
- [Custom Types](#custom-types)
- [Settings](#settings)
- [Contributing](#contributing)
- [License](#license)
- [Links](#links)

# What is Encodexx

Primitive, flexible, fast, compact, and fully type-safe binary serializer for JavaScript.

Encodexx is designed to be as developer-friendly as possible. No unnecessary files or duplicate type declarations in TypeScript. Its highly flexible architecture allows to describe any data and serialize it as quickly and compactly as possible to maximize the speed of your interface.

- Zero dependencies
- 3.5 KB bundle
- Works in both the browser and Node.js
- Extensive customization options
- Uses a low-level JavaScript API for fast encoding and decoding

Read the docs [encodexx.net](https://encodexx.net) and install via:

```bash
npm i encodexx
```

[Demo on codesanbox](https://codesandbox.io/p/sandbox/gd4jhj)

## Defining a Schema

A schema describes the data structure for serialization. Keep in mind that the same schema structure is required for both serialization and deserialization.

```js
import { Serializer, t } from "encodexx";

const schema = new Serializer({
	name: t.str,
	date: {
		createAt: t.date,
		updatedAt: t.optional(t.date),
	},
	age: t.uint8,
	logs: t.optional([
		{
			date: t.date,
			info: t.str,
		},
	]),
});
```

## Encoding an Object

Encode your object into a binary format with full TypeScript support:

```js
const obj = {
	name: "kyzinatra",
	date: {
		createdAt: new Date(),
	},
	age: 27,
};

const buffer = schema.encode(obj);
```

## Decoding an Object

Using the same schema, you can deserialize the object:

```js
const decoded = schema.decode(buffer);
```

## Schema Structure

In your schema, you can specify objects and arrays of any complexity. Use the built-in functions `t.or`, `t.schema`, `t.optional`, and other built-in types and functions to create schemas:

```js
import { Serializer, t } from "encodexx";

new Serializer({
	name: t.or(t.str, t.none), // string | null
	code: t.enumerate("CREATED", "UPDATED"), // "CREATED" | "UPDATED"
	info: {
		status: t.or(t.enumerate("MSG1", "MSG2"), t.float64), // "MSG1" | "MSG2" | number
	},
	matrix: [
		[
			{
				xValue: t.float64, // number
				yValue: t.float64, // number
				zValue: t.optional(t.float64), // zValue?: number
			},
		],
	],
});
```

## Custom Types

You can create your own types and use them just like the built-in ones. Usually you won't need this, but there are cases when you want low-level `DataBuffer` access to write your data. See the [documentation](https://encodexx.net/docs) for more details and examples.

```ts
import { customType } from "encodexx";
// int number from −2^39 to 2^39 - 1 (using bigint)

const MIN = -(2 ** 23);
const MAX = 2 ** 23 - 1;

export const int24 = customType<number>({
	decode(buffer) {
		const b0 = buffer.readUint8();
		const b1 = buffer.readUint8();
		const b2 = buffer.readUint8();

		// Combine bytes into a 24-bit value:
		let val24 = (b0 << 16) | (b1 << 8) | b2;
		// We can set sign by shifting left and then right with sign:
		val24 = (val24 << 8) >> 8;

		return val24;
	},
	encode(val, buffer) {
		// Convert negative numbers to their two's complement representation in 24 bits.
		if (val < 0) {
			val += 2 ** 24;
		}
		// Store the 40-bit value in Big Endian order (most significant byte first).
		buffer.writeUint8(Number((val >> 16) & 0xff));
		buffer.writeUint8(Number((val >> 8) & 0xff));
		buffer.writeUint8(Number(val & 0xff));
	},
	guard(data): data is number {
		if (typeof data !== "number") return false;
		return data <= MAX && data >= MIN;
	},
	name: "int24",
});
```

Then you can use this type on par with all the others:

```js
const serializer = new Serializer([int24]);

const encoded = serializer.encode([124, -325, 240_000]);
console.log(serializer.decode(encoded));
```

## Settings

You can pass several optional settings to enforce stricter serializer behavior:

```js
new Serializer(..., {
  strict: true,    // Will verify each object against the schema
  version: "1.2.10", // Will add a version tag during serialization. If the versions don't match during deserialization, it will throw an error
  resetCursor: true // Automatically resets the cursor during encoding and decoding. This parameter is needed for implementing complex custom types and is not required for normal usage. default - true
});
```

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [Website](https://encodexx.net)
- [Documentation](https://encodexx.net/docs)
- [Author](https://github.com/kyzinatra)
