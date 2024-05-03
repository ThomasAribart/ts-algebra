import type { A } from "ts-toolbelt";

import type { M } from "~/index";

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  M.Intersect<M.Object<{ str: M.Primitive<string> }, "str">, M.Never>,
  M.Never
> = 1;
neverNeverIntersect;

// --- ANY ---

const anyAlwaysIntersect: A.Equals<
  M.Intersect<M.Object<{ str: M.Primitive<string> }, "str">, M.Any>,
  M.Object<{ str: M.Primitive<string> }, "str">
> = 1;
anyAlwaysIntersect;

const objectToSerializedAny: A.Equals<
  M.Intersect<
    M.Object<{ date: M.Primitive<string> }, "date">,
    M.Any<true, { date: Date }>
  >,
  M.Object<
    { date: M.Primitive<string> },
    "date",
    M.Never,
    false,
    true,
    { date: Date }
  >
> = 1;
objectToSerializedAny;

const serializedObjectToAny: A.Equals<
  M.Intersect<
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      false,
      true,
      { date: Date }
    >,
    M.Any
  >,
  M.Object<
    { date: M.Primitive<string> },
    "date",
    M.Never,
    false,
    true,
    { date: Date }
  >
> = 1;
serializedObjectToAny;

const serializedObjectToSerializedAny: A.Equals<
  M.Intersect<
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      false,
      true,
      { date: Date }
    >,
    M.Any<true, { date: Date }>
  >,
  M.Object<
    { date: M.Primitive<string> },
    "date",
    M.Never,
    false,
    true,
    { date: Date } & { date: Date }
  >
> = 1;
serializedObjectToSerializedAny;

// --- CONSTS ---

const intersectingConst1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Const<{ str: "str"; bar: "str" }>
  >,
  M.Const<{ str: "str"; bar: "str" }>
> = 1;
intersectingConst1;

const intersectingConst2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Const<{ num: 42; str: "string" }>
  >,
  M.Const<{ num: 42; str: "string" }>
> = 1;
intersectingConst2;

const nonIntersectingConst1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Const<{ str: "str"; bar: "str" }>
  >,
  M.Never
> = 1;
nonIntersectingConst1;

const nonIntersectingConst2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Const<{ num: 42 }>
  >,
  M.Never
> = 1;
nonIntersectingConst2;

const objectToSerializedConst: A.Equals<
  M.Intersect<
    M.Object<{ date: M.Primitive<string> }, "date">,
    M.Const<{ date: "2022-01-01" }, true, { date: Date }>
  >,
  M.Const<{ date: "2022-01-01" }, true, { date: Date }>
> = 1;
objectToSerializedConst;

const serializedObjectToConst: A.Equals<
  M.Intersect<
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      false,
      true,
      { date: Date }
    >,
    M.Const<{ date: "2022-01-01" }>
  >,
  M.Const<{ date: "2022-01-01" }, true, { date: Date }>
> = 1;
serializedObjectToConst;

const serializedObjectToSerializedConst: A.Equals<
  M.Intersect<
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      false,
      true,
      { date: Date }
    >,
    M.Const<{ date: "2022-01-01" }, true, { date: Date }>
  >,
  M.Const<{ date: "2022-01-01" }, true, { date: Date } & { date: Date }>
> = 1;
serializedObjectToSerializedConst;

// --- ENUM ---

const intersectingEnum: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Enum<{ str: "string" } | 42>
  >,
  M.Enum<{ str: "string" }>
> = 1;
intersectingEnum;

const nonIntersectingEnum1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Enum<"bar" | { str: "string"; bar: 42 }>
  >,
  M.Enum<never>
> = 1;
nonIntersectingEnum1;

const nonIntersectingEnum2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Enum<"bar" | true | { num: 42 }>
  >,
  M.Enum<never>
> = 1;
nonIntersectingEnum2;

const objectToSerializedEnum: A.Equals<
  M.Intersect<
    M.Object<{ date: M.Primitive<string> }, "date">,
    M.Enum<
      { date: "2022-01-01" } | { date: "2023-01-01" },
      true,
      { date: Date }
    >
  >,
  M.Enum<{ date: "2022-01-01" } | { date: "2023-01-01" }, true, { date: Date }>
> = 1;
objectToSerializedEnum;

const serializedObjectToEnum: A.Equals<
  M.Intersect<
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      false,
      true,
      { date: Date }
    >,
    M.Enum<{ date: "2022-01-01" } | { date: "2023-01-01" }>
  >,
  M.Enum<{ date: "2022-01-01" } | { date: "2023-01-01" }, true, { date: Date }>
> = 1;
serializedObjectToEnum;

const serializedObjectToSerializedEnum: A.Equals<
  M.Intersect<
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      false,
      true,
      { date: Date }
    >,
    M.Enum<
      { date: "2022-01-01" } | { date: "2023-01-01" },
      true,
      { date: Date }
    >
  >,
  M.Enum<
    { date: "2022-01-01" } | { date: "2023-01-01" },
    true,
    { date: Date } & { date: Date }
  >
> = 1;
serializedObjectToSerializedEnum;

// --- PRIMITIVES ---

const primitivesNeverIntersect1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Primitive<string>
  >,
  M.Never
> = 1;
primitivesNeverIntersect1;

const primitivesNeverIntersect2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Primitive<boolean>
  >,
  M.Never
> = 1;
primitivesNeverIntersect2;

// --- ARRAY ---

const arraysNeverIntersect: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Array<M.Primitive<string>>
  >,
  M.Never
> = 1;
arraysNeverIntersect;

// --- TUPLE ---

const tuplesNeverIntersect: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>
  >,
  M.Never
> = 1;
tuplesNeverIntersect;

// --- OBJECT ---

const intersectingObject1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>
  >,
  M.Object<
    { str: M.Primitive<string>; foo: M.Primitive<string> },
    "str" | "foo",
    M.Primitive<string>
  >
> = 1;
intersectingObject1;

const intersectingObject2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Object<{ str: M.Primitive<string> }, "str">
  >,
  M.Object<{ str: M.Primitive<string> }, "str">
> = 1;
intersectingObject2;

const intersectingObject3: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Object<{ str: M.Primitive<string> }, "str">
  >,
  M.Object<{ str: M.Primitive<string> }, "str">
> = 1;
intersectingObject3;

const intersectingObject4: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any, true>,
    M.Object<{ foo: M.Primitive<string> }, "foo", M.Any>
  >,
  M.Object<
    { str: M.Primitive<string>; foo: M.Primitive<string> },
    "str" | "foo",
    M.Any,
    true
  >
> = 1;
intersectingObject4;

// Rejects "str" property because B is closed
const nonIntersectingObject1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Object<{ otherStr: M.Primitive<string> }, "otherStr">
  >,
  M.Never
> = 1;
nonIntersectingObject1;

// Rejects "str" property because it should be bool AND str
const nonIntersectingObject2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Object<{ bool: M.Primitive<boolean> }, "bool", M.Primitive<boolean>>
  >,
  M.Never
> = 1;
nonIntersectingObject2;

// --- UNION ---

const intersectingUnion: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Union<M.Primitive<string> | M.Const<{ str: "str" }>>
  >,
  M.Union<M.Never | M.Const<{ str: "str" }>>
> = 1;
intersectingUnion;

// Doesn't match string, neither object because it is closed
const nonIntersectingUnion1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Union<M.Const<"foo"> | M.Object<{ foo: M.Primitive<string> }, "foo">>
  >,
  M.Union<M.Never>
> = 1;
nonIntersectingUnion1;

const nonIntersectingUnion2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Union<M.Array<M.Primitive<boolean>>>
  >,
  M.Union<M.Never>
> = 1;
nonIntersectingUnion2;

const objectToSerializedObject: A.Equals<
  M.Intersect<
    M.Object<{ date: M.Primitive<string> }, "date">,
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      false,
      true,
      { date: Date }
    >
  >,
  M.Object<
    { date: M.Primitive<string> },
    "date",
    M.Never,
    false,
    true,
    { date: Date }
  >
> = 1;
objectToSerializedObject;

const serializedObjectToObject: A.Equals<
  M.Intersect<
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      false,
      true,
      { date: Date }
    >,
    M.Object<{ date: M.Primitive<string> }, "date">
  >,
  M.Object<
    { date: M.Primitive<string> },
    "date",
    M.Never,
    false,
    true,
    { date: Date }
  >
> = 1;
serializedObjectToObject;

const serializedObjectToSerializedObject: A.Equals<
  M.Intersect<
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      false,
      true,
      { date: Date }
    >,
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      false,
      true,
      { date: unknown }
    >
  >,
  M.Object<
    { date: M.Primitive<string> },
    "date",
    M.Never,
    false,
    true,
    { date: Date } & { date: unknown }
  >
> = 1;
serializedObjectToSerializedObject;

// --- INTERSECTION ---

const intersectingIntersection: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", M.Any>,
    M.Intersect<
      M.Object<{}, never, M.Any>,
      M.Object<{ num: M.Primitive<number> }, "num", M.Const<"foo">>
    >
  >,
  M.Object<
    { str: M.Const<"foo">; num: M.Primitive<number> },
    "str" | "num",
    M.Const<"foo">
  >
> = 1;
intersectingIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  M.Intersect<
    M.Object<{ baz: M.Primitive<string> }, "baz", M.Any>,
    M.Exclude<
      M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>,
      M.Const<{ foo: "bar" }>
    >
  >,
  M.Object<
    { foo: M.Primitive<string>; baz: M.Primitive<string> },
    "foo" | "baz",
    M.Primitive<string>
  >
> = 1;
intersectingExclusion;
