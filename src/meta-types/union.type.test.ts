import type { A } from "ts-toolbelt";

import type { M } from "~/index";

// --- INSTANCIATION ---

const noItems: A.Equals<M.Union<never>, M.Never> = 1;
noItems;

const neverItems: A.Equals<M.Union<M.Never>, M.Never> = 1;
neverItems;

// --- NEVER ---

const testNeverNonEmpty: A.Equals<
  M.Resolve<M.Union<M.Never | M.Primitive<string>>>,
  string
> = 1;
testNeverNonEmpty;

const testNeverEmpty: A.Equals<M.Resolve<M.Union<never>>, never> = 1;
testNeverEmpty;

// --- ANY ---

const testAny: A.Equals<
  M.Resolve<M.Union<M.Any | M.Primitive<string>>>,
  unknown
> = 1;
testAny;

// --- CONSTS ---

const testConst: A.Equals<
  M.Resolve<M.Union<M.Const<"foo"> | M.Const<"bar"> | M.Const<42>>>,
  "foo" | "bar" | 42
> = 1;
testConst;

// --- ENUMS ---

const testEnum: A.Equals<
  M.Resolve<M.Union<M.Enum<"foo" | "bar" | 42> | M.Enum<"baz" | 43>>>,
  "foo" | "bar" | "baz" | 42 | 43
> = 1;
testEnum;

// --- PRIMITIVES ---

const testPrimitive: A.Equals<
  M.Resolve<M.Union<M.Primitive<string> | M.Primitive<number>>>,
  string | number
> = 1;
testPrimitive;

// --- ARRAYS ---

const testArray: A.Equals<
  M.Resolve<
    M.Union<M.Array<M.Primitive<string>> | M.Array<M.Primitive<number>>>
  >,
  string[] | number[]
> = 1;
testArray;

// --- TUPLES ---

const testTuple: A.Equals<
  M.Resolve<
    M.Union<
      | M.Tuple<[M.Primitive<string>, M.Primitive<number>], M.Any>
      | M.Tuple<[M.Primitive<string>, M.Primitive<boolean>]>
    >
  >,
  [string, number, ...unknown[]] | [string, boolean]
> = 1;
testTuple;

// --- OBJECTS ---

const testObjects: A.Equals<
  M.Resolve<
    M.Union<
      | M.Object<{ bar: M.Primitive<number> }, "bar", M.Any>
      | M.Object<{ foo: M.Primitive<string> }, "foo">
    >
  >,
  { bar: number; [k: string]: unknown } | { foo: string }
> = 1;
testObjects;

// --- UNIONS ---

const testUnions: A.Equals<
  M.Resolve<
    M.Union<
      | M.Union<M.Primitive<string> | M.Primitive<boolean>>
      | M.Union<M.Const<"foo"> | M.Const<42>>
    >
  >,
  string | boolean | 42
> = 1;
testUnions;

// --- INTERSECTIONS ---

const testIntersections: A.Equals<
  M.Resolve<
    M.Union<
      | M.Intersect<M.Primitive<string>, M.Const<"foo">>
      | M.Intersect<M.Primitive<number>, M.Const<42>>
    >
  >,
  "foo" | 42
> = 1;
testIntersections;

// --- SERIALIZED ---

const testSerialized: A.Equals<
  M.Resolve<M.Union<M.Primitive<string, true, Date> | M.Primitive<boolean>>>,
  Date | boolean
> = 1;
testSerialized;

const testSerializedIgnored: A.Equals<
  M.Resolve<
    M.Union<M.Primitive<string, true, Date> | M.Primitive<boolean>>,
    { deserialize: false }
  >,
  string | boolean
> = 1;
testSerializedIgnored;
