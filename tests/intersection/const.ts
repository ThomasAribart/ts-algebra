import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const anyAlwaysIntersect: A.Equals<
  M.Intersect<M.Const<"foo">, M.Any>,
  M.Const<"foo">
> = 1;
anyAlwaysIntersect;

const constToSerializedAny: A.Equals<
  M.Intersect<M.Const<"2022-01-01">, M.Any<true, Date>>,
  M.Const<"2022-01-01", true, Date>
> = 1;
constToSerializedAny;

const serializedConstToAny: A.Equals<
  M.Intersect<M.Const<"2022-01-01", true, Date>, M.Any>,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedConstToAny;

const serializedConstToSerializedAny: A.Equals<
  M.Intersect<M.Const<"2022-01-01", true, Date>, M.Any<true, unknown>>,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedConstToSerializedAny;

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  M.Intersect<M.Const<"foo">, M.Never>,
  M.Never
> = 1;
neverNeverIntersect;

// --- CONSTS ---

const intersectingConst: A.Equals<
  M.Intersect<M.Const<"foo">, M.Const<"foo">>,
  M.Const<"foo">
> = 1;
intersectingConst;

const nonIntersectingConst: A.Equals<
  M.Intersect<M.Const<"foo">, M.Const<"bar">>,
  M.Never
> = 1;
nonIntersectingConst;

const constToSerializedConst: A.Equals<
  M.Intersect<M.Const<"2022-01-01">, M.Const<"2022-01-01", true, Date>>,
  M.Const<"2022-01-01", true, Date>
> = 1;
constToSerializedConst;

const serializedConstToConst: A.Equals<
  M.Intersect<M.Const<"2022-01-01", true, Date>, M.Const<"2022-01-01">>,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedConstToConst;

const serializedConstToSerializedConst: A.Equals<
  M.Intersect<
    M.Const<"2022-01-01", true, Date>,
    M.Const<"2022-01-01", true, Date>
  >,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedConstToSerializedConst;

// --- ENUM ---

const intersectingEnum: A.Equals<
  M.Intersect<M.Const<"foo">, M.Enum<"foo" | "bar" | "baz">>,
  M.Const<"foo">
> = 1;
intersectingEnum;

const nonIntersectingEnum: A.Equals<
  M.Intersect<M.Const<"foo">, M.Enum<"bar" | "baz">>,
  M.Never
> = 1;
nonIntersectingEnum;

const constToSerializedEnum: A.Equals<
  M.Intersect<
    M.Const<"2022-01-01">,
    M.Enum<"2022-01-01" | "2023-01-01", true, Date>
  >,
  M.Const<"2022-01-01", true, Date>
> = 1;
constToSerializedEnum;

const serializedConstToEnum: A.Equals<
  M.Intersect<
    M.Const<"2022-01-01", true, Date>,
    M.Enum<"2022-01-01" | "2023-01-01">
  >,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedConstToEnum;

const serializedConstToSerializedEnum: A.Equals<
  M.Intersect<
    M.Const<"2022-01-01", true, Date>,
    M.Enum<"2022-01-01" | "2023-01-01", true, Date>
  >,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedConstToSerializedEnum;

// --- PRIMITIVES ---

const intersectingPrimitive: A.Equals<
  M.Intersect<M.Const<"foo">, M.Primitive<string>>,
  M.Const<"foo">
> = 1;
intersectingPrimitive;

const nonIntersectingPrimitive: A.Equals<
  M.Intersect<M.Const<"foo">, M.Primitive<boolean>>,
  M.Never
> = 1;
nonIntersectingPrimitive;

const constToSerializedPrimitive: A.Equals<
  M.Intersect<M.Const<"2022-01-01">, M.Primitive<string, true, Date>>,
  M.Const<"2022-01-01", true, Date>
> = 1;
constToSerializedPrimitive;

const serializedConstToPrimitive: A.Equals<
  M.Intersect<M.Const<"2022-01-01", true, Date>, M.Primitive<string>>,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedConstToPrimitive;

const serializedConstToSerializedPrimitive: A.Equals<
  M.Intersect<
    M.Const<"2022-01-01", true, Date>,
    M.Primitive<string, true, Date>
  >,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedConstToSerializedPrimitive;

// --- ARRAY ---

const intersectingArray: A.Equals<
  M.Intersect<M.Const<["foo", "bar"]>, M.Array<M.Primitive<string>>>,
  M.Const<["foo", "bar"]>
> = 1;
intersectingArray;

const nonIntersectingArray: A.Equals<
  M.Intersect<M.Const<"foo">, M.Array<M.Primitive<string>>>,
  M.Never
> = 1;
nonIntersectingArray;

const constToSerializedArray: A.Equals<
  M.Intersect<
    M.Const<["2022-01-01"]>,
    M.Array<M.Primitive<string>, true, Date[]>
  >,
  M.Const<["2022-01-01"], true, Date[]>
> = 1;
constToSerializedArray;

const serializedConstToArray: A.Equals<
  M.Intersect<
    M.Const<["2022-01-01"], true, [Date]>,
    M.Array<M.Primitive<string>>
  >,
  M.Const<["2022-01-01"], true, [Date]>
> = 1;
serializedConstToArray;

const serializedConstToSerializedArray: A.Equals<
  M.Intersect<
    M.Const<["2022-01-01"], true, [Date]>,
    M.Array<M.Primitive<string>, true, Date[]>
  >,
  M.Const<["2022-01-01"], true, [Date] & Date[]>
> = 1;
serializedConstToSerializedArray;

// --- TUPLE ---

const intersectingTuple1: A.Equals<
  M.Intersect<
    M.Const<["foo", "bar"]>,
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>
  >,
  M.Const<["foo", "bar"]>
> = 1;
intersectingTuple1;

const intersectingTuple2: A.Equals<
  M.Intersect<
    M.Const<["foo", 42, "bar"]>,
    M.Tuple<[M.Primitive<string>, M.Primitive<number>], M.Primitive<string>>
  >,
  M.Const<["foo", 42, "bar"]>
> = 1;
intersectingTuple2;

const nonIntersectingTuple1: A.Equals<
  M.Intersect<
    M.Const<["foo", 42]>,
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>
  >,
  M.Never
> = 1;
nonIntersectingTuple1;

const nonIntersectingTuple2: A.Equals<
  M.Intersect<
    M.Const<"foo">,
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>
  >,
  M.Never
> = 1;
nonIntersectingTuple2;

const constToSerializedTuple: A.Equals<
  M.Intersect<
    M.Const<["2022-01-01"]>,
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>
  >,
  M.Const<["2022-01-01"], true, [Date]>
> = 1;
constToSerializedTuple;

const serializedConstToTuple: A.Equals<
  M.Intersect<
    M.Const<["2022-01-01"], true, [Date]>,
    M.Tuple<[M.Primitive<string>]>
  >,
  M.Const<["2022-01-01"], true, [Date]>
> = 1;
serializedConstToTuple;

const serializedConstToSerializedTuple: A.Equals<
  M.Intersect<
    M.Const<["2022-01-01"], true, [Date]>,
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>
  >,
  M.Const<["2022-01-01"], true, [Date]>
> = 1;
serializedConstToSerializedTuple;

// --- OBJECT ---

const intersectingObject: A.Equals<
  M.Intersect<
    M.Const<{ foo: "bar" }>,
    M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>
  >,
  M.Const<{ foo: "bar" }>
> = 1;
intersectingObject;

const nonIntersectingObject: A.Equals<
  M.Intersect<
    M.Const<"foo">,
    M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>
  >,
  M.Never
> = 1;
nonIntersectingObject;

const constToSerializedObject: A.Equals<
  M.Intersect<
    M.Const<{ date: "2022-01-01" }>,
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      true,
      { date: Date }
    >
  >,
  M.Const<{ date: "2022-01-01" }, true, { date: Date }>
> = 1;
constToSerializedObject;

const serializedConstToObject: A.Equals<
  M.Intersect<
    M.Const<{ date: "2022-01-01" }, true, { date: Date }>,
    M.Object<{ date: M.Primitive<string> }, "date", M.Never>
  >,
  M.Const<{ date: "2022-01-01" }, true, { date: Date }>
> = 1;
serializedConstToObject;

const serializedConstToSerializedObject: A.Equals<
  M.Intersect<
    M.Const<{ date: "2022-01-01" }, true, { date: Date }>,
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      true,
      { date: Date }
    >
  >,
  M.Const<{ date: "2022-01-01" }, true, { date: Date } & { date: Date }>
> = 1;
serializedConstToSerializedObject;

// --- UNION ---

const intersectingUnion1: A.Equals<
  M.Intersect<
    M.Const<"foo">,
    M.Union<M.Primitive<string> | M.Primitive<number>>
  >,
  M.Union<M.Const<"foo"> | M.Never>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  M.Intersect<M.Const<"foo">, M.Union<M.Const<"foo"> | M.Primitive<number>>>,
  M.Union<M.Const<"foo"> | M.Never>
> = 1;
intersectingUnion2;

const nonIntersectingUnion: A.Equals<
  M.Intersect<
    M.Const<"foo">,
    M.Union<M.Primitive<number> | M.Array<M.Primitive<string>>>
  >,
  M.Union<M.Never>
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const intersectingIntersection: A.Equals<
  M.Intersect<M.Const<"foo">, M.Intersect<M.Const<"foo">, M.Primitive<string>>>,
  M.Const<"foo">
> = 1;
intersectingIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  M.Intersect<M.Const<"foo">, M.Exclude<M.Primitive<string>, M.Const<"bar">>>,
  M.Const<"foo">
> = 1;
intersectingExclusion;
