# Encodexx

<img src="https://raw.githubusercontent.com/kyzinatra/encodexx/master/public/logo.svg" alt="logo" width="200"/>

Primitive, flexible, fast, compact, and fully type-safe binary serializer for JavaScript.

Visit [encodexx.net](https://encodexx.net) or install via:

```bash
npm i encodexx
```

[![Build Size](https://img.shields.io/bundlephobia/minzip/encodexx?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=encodexx)

Encodexx uses a low-level JavaScript API for fast encoding and decoding.

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
	logs: [
		{
			date: t.date,
			info: t.str,
		},
	],
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
	logs: [],
};

const buffer = schema.encode(obj);
```

## Decoding an Object

Using the same schema, you can deserialize the object:

```js
const decoded = schema.decode(buffer);
```

## Schema Structure

In your schema, you can specify objects and arrays of any complexity. Use the built-in functions `t.or`, `t.enumerate`, `t.optional`, and other built-in types to create schemas:

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

You can create your own types and use them just like the built-in ones. Usually you won't need this, but there are cases when you want low-level `Buffer` access to write your data. See the [documentation](https://encodexx.net/docs) for more details and examples.

```ts
import { customType } from "encodexx";

type TMyType = {
	name: string;
	age: number;
};

const myType = customType<TMyType>({
	decode(buffer) {
		return {
			name: buffer.readString(),
			age: buffer.readUint8(),
		};
	},
	encode(buffer, val) {
		buffer.writeString(val.name);
		buffer.writeUint8(val.age);
	},
	guard(data): data is TMyType {
		if (typeof data !== "object" || !data) return false;
		if (!("name" in data) || typeof data.name !== "string") return false;
		if (!("age" in data) || typeof data.age !== "number") return false;
		return true;
	},
	name: "mytype",
});
```

Then you can use this type on par with all the others:

```js
const serializer = new Serializer(myType);

const encoded = serializer.encode({ name: "kyzinatra", age: 25 });
console.log(serializer.decode(encoded));
```

## Settings

You can pass several settings to enforce stricter serializer behavior:

```js
new Serializer(..., {
  strict: true,    // Will verify each object against the schema
  version: "1.2.10" // Will add a version tag during serialization. If the versions don't match during deserialization, it will throw an error
});
```

## Links

- [Website](https://encodexx.net)
- [Documentation](https://encodexx.net/docs)
- [Author](https://github.com/kyzinatra)
