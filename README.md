<img src="assets/header-round-medium.png" width="100%" align="center" />

<p align="right">
  <i>If you use this repo, star it ✨</i>
</p>

# Your types on steroids 💊

`ts-algebra` exposes a subset of TS types called **meta-types**. Meta-types are types that encapsulate other types.

```typescript
import { Meta } from "ts-algebra";

type MetaString = Meta.Primitive<string>;
```

The encapsulated type can be retrieved using the `Resolve` operation.

```typescript
type Resolved = Meta.Resolve<MetaString>;
// => string 🙌
```

As inspired by [ts-toolbelt](https://github.com/millsp/ts-toolbelt), you can also use the more compact `M` notation:

```typescript
import { M } from "ts-algebra";

type Resolved = M.Resolve<M.Primitive<string>>;
// => string 🙌
```

## Okay, but... why ? 🤔

Any type can be represented through Meta-Types. However, Meta-Types allow operations **that would not otherwise be possible with regular types**.

For instance, handling object additional properties is not possible in "classic" typescript:

```typescript
type MyObject = {
  str: string; // <= ❌ Will error because "str" is assignable to string
  [key: string]: number;
};

type MyObjectKeys = keyof MyObject;
// => string <= ❌ Impossible to isolate "str" property key
```

`ts-algebra` allows easy definition and manipulation of such objects (see the [`Object` Meta-Type section](#object)).

```typescript
type MyObject = M.Object<
  { str: M.Primitive<string> }, // <= Named properties
  "str", // <= Required properties keys
  true, // <= Allows for additional properties (false by default)
  M.Primitive<number> // <= Additional properties type
>;

type Resolved = M.Resolve<MyObject>;
// => { str: string, [key: string]: unknown } 🙌
```

In presence of named properties, additional properties will be resolved as unknown to avoid conflicts. However, they are kept during any manipulation done

Speaking of manipulations: Meta-types also allow for **richer operations**: allowing for intersections and exclusions. Set theory.

```typescript
type NaiveIntersection = { str: string } & { num: number };
// => { str: string, num: number }

type TrueIntersection = M.Resolve<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Object<{ num: M.Primitive<number> }, "num">
  >
>;
// => never 🙌
```

> The need for meta-types appeared while I was working on [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts).

## Table of content

- [Installation](#installation)
- [Meta-types](#meta-types)
  - [Any](#any)
  - [Never](#never)
  - [Const](#const)
  - [Enum](#enum)
  - [Primitive](#primitive)
  - [Array](#array)
  - [Tuple](#tuple)
  - [Object](#object)
  - [Union](#union)
- [Methods](#methods)
  - [Resolve](#resolve)
  - [Intersect](#intersect)
  - [Exclude](#exclude)

## Installation

```bash
# npm
npm install --save-dev ts-algebra

# yarn
yarn add --dev ts-algebra
```

## Meta-Types

### Any

```typescript
import { M } from "ts-algebra";

type Any = M.Any;

type Resolved = M.Resolve<Any>;
// => unknown
```

### Never

```typescript
import { M } from "ts-algebra";

type Never = M.Never;

type Resolved = M.Resolve<Never>;
// => never
```

Note that, to keep the amount of type computations to a minimum, **`M.Never` is the only Meta-Type that is non-representable** (i.e. that resolves to `never`). Any other non-representable Meta-Type (for instance, a meta-object containing a `M.Never` required property) will be instanciated as `M.Never`.

### Const

```typescript
import { M } from "ts-algebra";

type Foo = M.Const<"foo">;

type Resolved = M.Resolve<Foo>;
// => "foo"
```

### Enum

```typescript
import { M } from "ts-algebra";

type MetaFood = M.Enum<"pizza" | "taco" | "fries">;

type Food = M.Resolve<MetaFood>;
// => "pizza" | "taco" | "fries"
```

Representability: Providing no value to `M.Enum` will instanciate it as `M.Never`

```typescript
type EmptyEnum = M.Enum<never>;
// => M.Never
```

### Primitive

`M.Primitive` can be used to represent either `string`, `number`, `boolean` or `null`.

```typescript
import { M } from "ts-algebra";

type MetaString = M.Primitive<string>;
type Resolved = M.Resolve<MetaString>;
// => string

type MetaNumber = M.Primitive<number>;
type Resolved = M.Resolve<MetaNumber>;
// => number

type MetaBoolean = M.Primitive<boolean>;
type Resolved = M.Resolve<MetaBoolean>;
// => boolean

type MetaNull = M.Primitive<null>;
type Resolved = M.Resolve<MetaNull>;
// => null
```

Representability: Primitives are always representable

### Array

```typescript
import { M } from "ts-algebra";

type MetaStringArray = M.Array<M.Primitive<string>>;
type Resolved = M.Resolve<MetaStringArray>;
// => string[]
```

Representability: Arrays are always representable by an empty array.

### Tuple

Syntax: TODO

```typescript
import { M } from "ts-algebra";

type StringTuple = M.Tuple<[M.Primitive<string>]>;
type Resolved = M.Resolve<StringTuple>;
// => [string]
```

Tuples can have **additional items**. By default, those are typed as `M.Any`, but can be typed as well.

```typescript
type OpenStringTuple = M.Tuple<[M.Primitive<string>], true>;
type Resolved = M.Resolve<OpenStringTuple>;
// [string, ...unknown[]]

type OpenStringTuple = M.Tuple<
  [M.Primitive<string>], // <= M.Type[] tuple (finite)
  true, // <= Allows additional items (default: false)
  M.Primitive<number> // <= Additional items type (default: M.Any)
>;
type Resolved = M.Resolve<OpenAllStringTuple>;
// => [string, ...number[]]
```
