import type { A } from "ts-toolbelt";

import type { M } from "~/index";

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  M.Intersect<M.Primitive<string>, M.Never>,
  M.Never
> = 1;
neverNeverIntersect;

// --- ANY ---

const anyAlwaysIntersect: A.Equals<
  M.Intersect<M.Primitive<string>, M.Any>,
  M.Primitive<string>
> = 1;
anyAlwaysIntersect;

const primitiveToSerializedAny: A.Equals<
  M.Intersect<M.Primitive<string>, M.Any<true, Date>>,
  M.Primitive<string, true, Date>
> = 1;
primitiveToSerializedAny;

const serializedPrimitiveToAny: A.Equals<
  M.Intersect<M.Primitive<string, true, Date>, M.Any>,
  M.Primitive<string, true, Date>
> = 1;
serializedPrimitiveToAny;

const serializedPrimitiveToSerializedAny: A.Equals<
  M.Intersect<M.Primitive<string, true, Date>, M.Any<true, unknown>>,
  M.Primitive<string, true, Date>
> = 1;
serializedPrimitiveToSerializedAny;

// --- CONSTS ---

const intersectingConst: A.Equals<
  M.Intersect<M.Primitive<string>, M.Const<"foo">>,
  M.Const<"foo">
> = 1;
intersectingConst;

const nonIntersectingConst: A.Equals<
  M.Intersect<M.Primitive<string>, M.Const<42>>,
  M.Never
> = 1;
nonIntersectingConst;

const primitiveToSerializedConst: A.Equals<
  M.Intersect<M.Primitive<string>, M.Const<"2022-01-01", true, Date>>,
  M.Const<"2022-01-01", true, Date>
> = 1;
primitiveToSerializedConst;

const serializedPrimitiveToConst: A.Equals<
  M.Intersect<M.Primitive<string, true, Date>, M.Const<"2022-01-01">>,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedPrimitiveToConst;

const serializedPrimitiveToSerializedConst: A.Equals<
  M.Intersect<
    M.Primitive<string, true, Date>,
    M.Const<"2022-01-01", true, Date>
  >,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedPrimitiveToSerializedConst;

// --- ENUM ---

const intersectingEnum1: A.Equals<
  M.Intersect<M.Primitive<string>, M.Enum<"foo" | "bar" | 42>>,
  M.Enum<"foo" | "bar">
> = 1;
intersectingEnum1;

const intersectingEnum2: A.Equals<
  M.Intersect<M.Primitive<number>, M.Enum<"bar" | "baz" | 42>>,
  M.Enum<42>
> = 1;
intersectingEnum2;

const nonIntersectingEnum: A.Equals<
  M.Intersect<M.Primitive<number>, M.Enum<"bar" | "baz">>,
  M.Enum<never>
> = 1;
nonIntersectingEnum;

const primitiveToSerializedEnum: A.Equals<
  M.Intersect<
    M.Primitive<string>,
    M.Enum<"2022-01-01" | "2023-01-01", true, Date>
  >,
  M.Enum<"2022-01-01" | "2023-01-01", true, Date>
> = 1;
primitiveToSerializedEnum;

const serializedPrimitiveToEnum: A.Equals<
  M.Intersect<
    M.Primitive<string, true, Date>,
    M.Enum<"2022-01-01" | "2023-01-01">
  >,
  M.Enum<"2022-01-01" | "2023-01-01", true, Date>
> = 1;
serializedPrimitiveToEnum;

const serializedPrimitiveToSerializedEnum: A.Equals<
  M.Intersect<
    M.Primitive<string, true, Date>,
    M.Enum<"2022-01-01" | "2023-01-01", true, Date>
  >,
  M.Enum<"2022-01-01" | "2023-01-01", true, Date>
> = 1;
serializedPrimitiveToSerializedEnum;

// --- PRIMITIVES ---

const intersectingPrimitive: A.Equals<
  M.Intersect<M.Primitive<string>, M.Primitive<string>>,
  M.Primitive<string>
> = 1;
intersectingPrimitive;

const nonIntersectingPrimitive: A.Equals<
  M.Intersect<M.Primitive<string>, M.Primitive<boolean>>,
  M.Never
> = 1;
nonIntersectingPrimitive;

const primitiveToSerializedPrimitive: A.Equals<
  M.Intersect<M.Primitive<string>, M.Primitive<string, true, Date>>,
  M.Primitive<string, true, Date>
> = 1;
primitiveToSerializedPrimitive;

const serializedPrimitiveToPrimitive: A.Equals<
  M.Intersect<M.Primitive<string, true, Date>, M.Primitive<string>>,
  M.Primitive<string, true, Date>
> = 1;
serializedPrimitiveToPrimitive;

const serializedPrimitiveToSerializedPrimitive: A.Equals<
  M.Intersect<M.Primitive<string, true, Date>, M.Primitive<string, true, Date>>,
  M.Primitive<string, true, Date>
> = 1;
serializedPrimitiveToSerializedPrimitive;

// --- ARRAY ---

const arraysNeverIntersect: A.Equals<
  M.Intersect<M.Primitive<string>, M.Array<M.Primitive<string>>>,
  M.Never
> = 1;
arraysNeverIntersect;

// --- TUPLE ---

const tuplesNeverIntersect: A.Equals<
  M.Intersect<
    M.Primitive<string>,
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>
  >,
  M.Never
> = 1;
tuplesNeverIntersect;

// --- OBJECT ---

const objectsNeverIntersect: A.Equals<
  M.Intersect<
    M.Primitive<string>,
    M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>
  >,
  M.Never
> = 1;
objectsNeverIntersect;

// --- UNION ---

const intersectingUnion1: A.Equals<
  M.Intersect<
    M.Primitive<string>,
    M.Union<M.Primitive<string> | M.Primitive<number>>
  >,
  M.Union<M.Primitive<string> | M.Never>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  M.Intersect<
    M.Primitive<string>,
    M.Union<M.Const<"foo"> | M.Primitive<number>>
  >,
  M.Union<M.Const<"foo"> | M.Never>
> = 1;
intersectingUnion2;

const nonIntersectingUnion: A.Equals<
  M.Intersect<
    M.Primitive<string>,
    M.Union<M.Primitive<number> | M.Array<M.Primitive<string>>>
  >,
  M.Union<M.Never>
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const intersectingIntersection: A.Equals<
  M.Intersect<
    M.Const<"foo">,
    M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Primitive<string>>
  >,
  M.Const<"foo">
> = 1;
intersectingIntersection;

// --- EXCLUSION ---

const intersectingExclusion1: A.Equals<
  M.Intersect<
    M.Primitive<string>,
    M.Exclude<M.Enum<"foo" | 42 | true>, M.Primitive<number>>
  >,
  M.Enum<"foo">
> = 1;
intersectingExclusion1;

const intersectingExclusion2: A.Equals<
  M.Intersect<M.Primitive<number>, M.Exclude<M.Primitive<number>, M.Const<42>>>,
  M.Primitive<number>
> = 1;
intersectingExclusion2;
