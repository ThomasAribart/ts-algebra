import { A } from "ts-toolbelt";

import { M } from "index";

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar">, M.Never>,
  M.Never
> = 1;
neverNeverIntersect;

// --- ANY ---

const anyAlwaysIntersect: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar">, M.Any>,
  M.Enum<"foo" | "bar">
> = 1;
anyAlwaysIntersect;

const enumToSerializedAny: A.Equals<
  M.Intersect<M.Enum<"2022-01-01" | "2023-01-01">, M.Any<true, Date>>,
  M.Enum<"2022-01-01" | "2023-01-01", true, Date>
> = 1;
enumToSerializedAny;

const serializedEnumToAny: A.Equals<
  M.Intersect<M.Enum<"2022-01-01" | "2023-01-01", true, Date>, M.Any>,
  M.Enum<"2022-01-01" | "2023-01-01", true, Date>
> = 1;
serializedEnumToAny;

const serializedEnumToSerializedAny: A.Equals<
  M.Intersect<
    M.Enum<"2022-01-01" | "2023-01-01", true, Date>,
    M.Any<true, unknown>
  >,
  M.Enum<"2022-01-01" | "2023-01-01", true, Date>
> = 1;
serializedEnumToSerializedAny;

// --- CONSTS ---

const intersectingConst: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Const<"foo">>,
  M.Const<"foo">
> = 1;
intersectingConst;

const nonIntersectingConst: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Const<true>>,
  M.Never
> = 1;
nonIntersectingConst;

const enumToSerializedConst: A.Equals<
  M.Intersect<
    M.Enum<"2022-01-01" | "2023-01-01">,
    M.Const<"2022-01-01", true, Date>
  >,
  M.Const<"2022-01-01", true, Date>
> = 1;
enumToSerializedConst;

const serializedEnumToConst: A.Equals<
  M.Intersect<
    M.Enum<"2022-01-01" | "2023-01-01", true, Date>,
    M.Const<"2022-01-01">
  >,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedEnumToConst;

const serializedEnumToSerializedConst: A.Equals<
  M.Intersect<
    M.Enum<"2022-01-01" | "2023-01-01", true, Date>,
    M.Const<"2022-01-01", true, Date>
  >,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedEnumToSerializedConst;

// --- ENUM ---

const intersectingEnum: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Enum<"foo" | 42>>,
  M.Enum<"foo" | 42>
> = 1;
intersectingEnum;

const nonIntersectingEnum: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Enum<43 | true>>,
  M.Enum<never>
> = 1;
nonIntersectingEnum;

const enumToSerializedEnum: A.Equals<
  M.Intersect<
    M.Enum<"2021-01-01" | "2022-01-01">,
    M.Enum<"2022-01-01" | "2023-01-01", true, Date>
  >,
  M.Enum<"2022-01-01", true, Date>
> = 1;
enumToSerializedEnum;

const serializedEnumToEnum: A.Equals<
  M.Intersect<
    M.Enum<"2021-01-01" | "2022-01-01", true, Date>,
    M.Enum<"2022-01-01" | "2023-01-01">
  >,
  M.Enum<"2022-01-01", true, Date>
> = 1;
serializedEnumToEnum;

const serializedEnumToSerializedEnum: A.Equals<
  M.Intersect<
    M.Enum<"2021-01-01" | "2022-01-01", true, Date>,
    M.Enum<"2022-01-01" | "2023-01-01", true, Date>
  >,
  M.Enum<"2022-01-01", true, Date>
> = 1;
serializedEnumToSerializedEnum;

// --- PRIMITIVES ---

const intersectingPrimitive1: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Primitive<string>>,
  M.Enum<"foo" | "bar">
> = 1;
intersectingPrimitive1;

enum Food {
  Pizza = "pizza",
  Tacos = "tacos",
  Fries = "fries",
}

const intersectingPrimitive2: A.Equals<
  M.Intersect<M.Enum<Food>, M.Primitive<string>>,
  M.Enum<Food>
> = 1;
intersectingPrimitive2;

const nonIntersectingPrimitive: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Primitive<boolean>>,
  M.Enum<never>
> = 1;
nonIntersectingPrimitive;

const enumToSerializedPrimitive: A.Equals<
  M.Intersect<
    M.Enum<"2022-01-01" | "2023-01-01">,
    M.Primitive<string, true, Date>
  >,
  M.Enum<"2022-01-01" | "2023-01-01", true, Date>
> = 1;
enumToSerializedPrimitive;

const serializedEnumToPrimitive: A.Equals<
  M.Intersect<
    M.Enum<"2022-01-01" | "2023-01-01", true, Date>,
    M.Primitive<string>
  >,
  M.Enum<"2022-01-01" | "2023-01-01", true, Date>
> = 1;
serializedEnumToPrimitive;

const serializedEnumToSerializedPrimitive: A.Equals<
  M.Intersect<
    M.Enum<"2022-01-01" | "2023-01-01", true, Date>,
    M.Primitive<string, true, Date>
  >,
  M.Enum<"2022-01-01" | "2023-01-01", true, Date>
> = 1;
serializedEnumToSerializedPrimitive;

// --- ARRAY ---

const intersectingArray: A.Equals<
  M.Intersect<M.Enum<["foo", "bar"] | [42]>, M.Array<M.Primitive<string>>>,
  M.Enum<["foo", "bar"]>
> = 1;
intersectingArray;

const nonIntersectingArray: A.Equals<
  M.Intersect<M.Enum<"foo" | 42>, M.Array<M.Primitive<string>>>,
  M.Enum<never>
> = 1;
nonIntersectingArray;

const enumToSerializedArray: A.Equals<
  M.Intersect<
    M.Enum<["2022-01-01"] | ["2023-01-01"]>,
    M.Array<M.Primitive<string>, true, Date[]>
  >,
  M.Enum<["2022-01-01"] | ["2023-01-01"], true, Date[]>
> = 1;
enumToSerializedArray;

const serializedEnumToArray: A.Equals<
  M.Intersect<
    M.Enum<["2022-01-01"] | ["2023-01-01"], true, [Date]>,
    M.Array<M.Primitive<string>>
  >,
  M.Enum<["2022-01-01"] | ["2023-01-01"], true, [Date]>
> = 1;
serializedEnumToArray;

const serializedEnumToSerializedArray: A.Equals<
  M.Intersect<
    M.Enum<["2022-01-01"] | ["2023-01-01"], true, [Date]>,
    M.Array<M.Primitive<string>, true, Date[]>
  >,
  M.Enum<["2022-01-01"] | ["2023-01-01"], true, [Date] & Date[]>
> = 1;
serializedEnumToSerializedArray;

// --- TUPLE ---

const intersectingTuple: A.Equals<
  M.Intersect<
    M.Enum<["foo", "bar"] | ["foo", 42]>,
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>
  >,
  M.Enum<["foo", "bar"]>
> = 1;
intersectingTuple;

const nonIntersectingTuple: A.Equals<
  M.Intersect<
    M.Enum<"foo" | "bar" | 42>,
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>
  >,
  M.Enum<never>
> = 1;
nonIntersectingTuple;

const enumToSerializedTuple: A.Equals<
  M.Intersect<
    M.Enum<["2022-01-01"] | ["2023-01-01"]>,
    M.Tuple<[M.Primitive<string>], M.Never, true, Date[]>
  >,
  M.Enum<["2022-01-01"] | ["2023-01-01"], true, Date[]>
> = 1;
enumToSerializedTuple;

const serializedEnumToTuple: A.Equals<
  M.Intersect<
    M.Enum<["2022-01-01"] | ["2023-01-01"], true, [Date]>,
    M.Tuple<[M.Primitive<string>]>
  >,
  M.Enum<["2022-01-01"] | ["2023-01-01"], true, [Date]>
> = 1;
serializedEnumToTuple;

const serializedEnumToSerializedTuple: A.Equals<
  M.Intersect<
    M.Enum<["2022-01-01"] | ["2023-01-01"], true, [Date]>,
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>
  >,
  M.Enum<["2022-01-01"] | ["2023-01-01"], true, [Date]>
> = 1;
serializedEnumToSerializedTuple;

// --- OBJECT ---

const intersectingObject: A.Equals<
  M.Intersect<
    M.Enum<{ foo: "str"; bar: "str" } | { foo: "str"; bar: 42 }>,
    M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>
  >,
  M.Enum<{ foo: "str"; bar: "str" }>
> = 1;
intersectingObject;

const nonIntersectingObject: A.Equals<
  M.Intersect<
    M.Enum<"foo" | "bar" | 42>,
    M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>
  >,
  M.Enum<never>
> = 1;
nonIntersectingObject;

const enumToSerializedObject: A.Equals<
  M.Intersect<
    M.Enum<{ date: "2022-01-01" } | { date: "2023-01-01" }>,
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      true,
      { date: Date }
    >
  >,
  M.Enum<{ date: "2022-01-01" } | { date: "2023-01-01" }, true, { date: Date }>
> = 1;
enumToSerializedObject;

const serializedEnumToObject: A.Equals<
  M.Intersect<
    M.Enum<
      { date: "2022-01-01" } | { date: "2023-01-01" },
      true,
      { date: Date }
    >,
    M.Object<{ date: M.Primitive<string> }, "date", M.Never>
  >,
  M.Enum<{ date: "2022-01-01" } | { date: "2023-01-01" }, true, { date: Date }>
> = 1;
serializedEnumToObject;

const serializedEnumToSerializedObject: A.Equals<
  M.Intersect<
    M.Enum<
      { date: "2022-01-01" } | { date: "2023-01-01" },
      true,
      { date: Date }
    >,
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
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
serializedEnumToSerializedObject;

// --- UNION ---

const intersectingUnion1: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Union<M.Primitive<string>>>,
  M.Union<M.Enum<"foo" | "bar">>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  M.Intersect<
    M.Enum<"foo" | "bar" | 42>,
    M.Union<M.Const<"foo"> | M.Primitive<boolean>>
  >,
  M.Union<M.Const<"foo"> | M.Enum<never>>
> = 1;
intersectingUnion2;

const nonIntersectingUnion: A.Equals<
  M.Intersect<
    M.Enum<"foo" | "bar" | 42>,
    M.Union<M.Object | M.Primitive<boolean>>
  >,
  M.Union<M.Enum<never>>
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const intersectingIntersection: A.Equals<
  M.Intersect<
    M.Enum<"foo" | "bar" | 42>,
    M.Intersect<M.Primitive<string>, M.Const<"foo">>
  >,
  M.Const<"foo">
> = 1;
intersectingIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  M.Intersect<
    M.Enum<"foo" | "bar" | "baz" | 42>,
    M.Exclude<M.Primitive<string>, M.Enum<"foo" | "bar">>
  >,
  // Cannot do better, now that we resolve exclusions right away
  M.Enum<"foo" | "bar" | "baz">
> = 1;
intersectingExclusion;
