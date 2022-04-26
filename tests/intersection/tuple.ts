import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const anysAlwaysIntersect: A.Equals<
  M.Intersect<M.Tuple<[M.Primitive<string>], M.Any>, M.Any>,
  M.Tuple<[M.Primitive<string>], M.Any>
> = 1;
anysAlwaysIntersect;

const tupleToSerializedAny: A.Equals<
  M.Intersect<M.Tuple<[M.Primitive<string>]>, M.Any<true, Date[]>>,
  M.Tuple<[M.Primitive<string>], M.Never, true, Date[]>
> = 1;
tupleToSerializedAny;

const serializedTupleToAny: A.Equals<
  M.Intersect<M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>, M.Any>,
  M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>
> = 1;
serializedTupleToAny;

const serializedTupleToSerializedAny: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>,
    M.Any<true, unknown[]>
  >,
  M.Tuple<[M.Primitive<string>], M.Never, true, [Date] & unknown[]>
> = 1;
serializedTupleToSerializedAny;

// --- NEVER ---

const neversNeverIntersect: A.Equals<
  M.Intersect<M.Tuple<[M.Primitive<string>], M.Any>, M.Never>,
  M.Never
> = 1;
neversNeverIntersect;

// --- CONSTS ---

const intersectingConst1: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>, M.Primitive<number>], M.Any>,
    M.Const<["foo", 42, { any: "value" }]>
  >,
  M.Const<["foo", 42, { any: "value" }]>
> = 1;
intersectingConst1;

const intersectingConst2: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>, M.Primitive<number>], M.Primitive<boolean>>,
    M.Const<["foo", 42, true]>
  >,
  M.Const<["foo", 42, true]>
> = 1;
intersectingConst2;

const nonIntersectingConst1: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>, M.Primitive<number>], M.Primitive<boolean>>,
    M.Const<["foo", 42, "bar"]>
  >,
  M.Never
> = 1;
nonIntersectingConst1;

const nonIntersectingConst2: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>, M.Primitive<number>], M.Any>,
    M.Const<[42, "foo"]>
  >,
  M.Never
> = 1;
nonIntersectingConst2;

const tupleToSerializedConst: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>]>,
    M.Const<["2022-01-01"], true, [Date]>
  >,
  M.Const<["2022-01-01"], true, [Date]>
> = 1;
tupleToSerializedConst;

const serializedTupleToConst: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>,
    M.Const<["2022-01-01"]>
  >,
  M.Const<["2022-01-01"], true, [Date]>
> = 1;
serializedTupleToConst;

const serializedTupleToSerializedConst: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>,
    M.Const<["2022-01-01"], true, [Date]>
  >,
  M.Const<["2022-01-01"], true, [Date]>
> = 1;
serializedTupleToSerializedConst;

// --- ENUM ---

const intersectingEnum1: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>, M.Primitive<number>], M.Primitive<boolean>>,
    M.Enum<
      ["foo"] | ["foo", 42] | ["foo", 42, true] | ["foo", 42, { any: "value" }]
    >
  >,
  M.Enum<["foo", 42, true] | ["foo", 42]>
> = 1;
intersectingEnum1;

const intersectingEnum2: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>, M.Primitive<number>]>,
    M.Enum<
      ["foo"] | ["foo", 42] | ["foo", 42, true] | ["foo", 42, { any: "value" }]
    >
  >,
  M.Enum<["foo", 42]>
> = 1;
intersectingEnum2;

const nonIntersectingEnum: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>, M.Primitive<number>], M.Primitive<boolean>>,
    M.Enum<["bar", "baz"]>
  >,
  M.Enum<never>
> = 1;
nonIntersectingEnum;

const tupleToSerializedEnum: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>]>,
    M.Enum<["2022-01-01"] | ["2023-01-01"], true, [Date]>
  >,
  M.Enum<["2022-01-01"] | ["2023-01-01"], true, [Date]>
> = 1;
tupleToSerializedEnum;

const serializedTupleToEnum: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Never, true, Date[]>,
    M.Enum<["2022-01-01"] | ["2023-01-01"]>
  >,
  M.Enum<["2022-01-01"] | ["2023-01-01"], true, Date[]>
> = 1;
serializedTupleToEnum;

const serializedTupleToSerializedEnum: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>,
    M.Enum<["2022-01-01"] | ["2023-01-01"], true, [Date]>
  >,
  M.Enum<["2022-01-01"] | ["2023-01-01"], true, [Date]>
> = 1;
serializedTupleToSerializedEnum;

// --- PRIMITIVES ---

const primitivesNeverIntersect: A.Equals<
  M.Intersect<M.Tuple<[M.Primitive<string>], M.Any>, M.Primitive<string>>,
  M.Never
> = 1;
primitivesNeverIntersect;

// --- ARRAY ---

const intersectingArray1: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Any>,
    M.Array<M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>], M.Primitive<string>>
> = 1;
intersectingArray1;

const intersectingArray2: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>,
    M.Array<M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>], M.Primitive<string>>
> = 1;
intersectingArray2;

const intersectingArray3: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Const<"foo">>,
    M.Array<M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>], M.Const<"foo">>
> = 1;
intersectingArray3;

const intersectingArray4: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Enum<"foo" | 42>>,
    M.Array<M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>], M.Enum<"foo">>
> = 1;
intersectingArray4;

const intersectingArray5: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Primitive<number>>,
    M.Array<M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>]>
> = 1;
intersectingArray5;

const nonIntersectingArray: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>, M.Primitive<boolean>], M.Primitive<string>>,
    M.Array<M.Primitive<string>>
  >,
  M.Never
> = 1;
nonIntersectingArray;

const tupleToSerializedArray: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>]>,
    M.Array<M.Primitive<string>, true, Date[]>
  >,
  M.Tuple<[M.Primitive<string>], M.Never, true, Date[]>
> = 1;
tupleToSerializedArray;

const serializedTupleToArray: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>,
    M.Array<M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>
> = 1;
serializedTupleToArray;

const serializedTupleToSerializedArray: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>,
    M.Array<M.Primitive<string>, true, Date[]>
  >,
  M.Tuple<[M.Primitive<string>], M.Never, true, Date[] & [Date]>
> = 1;
serializedTupleToSerializedArray;

// --- TUPLE ---

const intersectingTuple1: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Any>,
    M.Tuple<[M.Primitive<string>], M.Any>
  >,
  M.Tuple<[M.Primitive<string>], M.Any>
> = 1;
intersectingTuple1;

const intersectingTuple2: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Any>,
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>], M.Primitive<string>>
> = 1;
intersectingTuple2;

const intersectingTuple3: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Any>,
    M.Tuple<[M.Primitive<string>], M.Const<"foo">>
  >,
  M.Tuple<[M.Primitive<string>], M.Const<"foo">>
> = 1;
intersectingTuple3;

const intersectingTuple4: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>], M.Enum<"foo" | 42>>
  >,
  M.Tuple<[M.Primitive<string>], M.Enum<"foo">>
> = 1;
intersectingTuple4;

const intersectingTuple5: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>], M.Primitive<number>>
  >,
  M.Tuple<[M.Primitive<string>]>
> = 1;
intersectingTuple5;

const intersectingTuple6: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Any>,
    M.Tuple<[M.Primitive<string>, M.Primitive<boolean>], M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>, M.Primitive<boolean>], M.Primitive<string>>
> = 1;
intersectingTuple6;

const intersectingTuple7: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>]>,
    M.Tuple<[M.Primitive<string>], M.Any>
  >,
  M.Tuple<[M.Primitive<string>]>
> = 1;
intersectingTuple7;

const nonIntersectingTuple1: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>]>,
    M.Tuple<[M.Primitive<string>, M.Primitive<boolean>], M.Any>
  >,
  M.Never
> = 1;
nonIntersectingTuple1;

const nonIntersectingTuple2: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>, M.Primitive<string>], M.Any>,
    M.Tuple<[M.Primitive<string>, M.Primitive<boolean>], M.Any>
  >,
  M.Never
> = 1;
nonIntersectingTuple2;

const tupleToSerializedTuple: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>]>,
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>
  >,
  M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>
> = 1;
tupleToSerializedTuple;

const serializedTupleToTuple: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>,
    M.Tuple<[M.Primitive<string>]>
  >,
  M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>
> = 1;
serializedTupleToTuple;

const serializedTupleToSerializedTuple: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>,
    M.Tuple<[M.Primitive<string>], M.Never, true, Date[]>
  >,
  M.Tuple<[M.Primitive<string>], M.Never, true, [Date] & Date[]>
> = 1;
serializedTupleToSerializedTuple;

// --- OBJECT ---

const objectsNeverIntersect: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Any>,
    M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>
  >,
  M.Never
> = 1;
objectsNeverIntersect;

// --- UNION ---

const intersectingUnion1: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Any>,
    M.Union<
      | M.Tuple<[M.Primitive<string>], M.Any>
      | M.Tuple<[M.Primitive<number>], M.Any>
    >
  >,
  M.Union<M.Never | M.Tuple<[M.Primitive<string>], M.Any>>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Any>,
    M.Union<M.Const<["foo"]> | M.Tuple<[M.Primitive<number>], M.Any>>
  >,
  M.Union<M.Never | M.Const<["foo"]>>
> = 1;
intersectingUnion2;

const nonIntersectingUnion: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Any>,
    M.Union<
      M.Array<M.Primitive<number>> | M.Tuple<[M.Primitive<boolean>], M.Any>
    >
  >,
  M.Never
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const intersectingIntersection: A.Equals<
  M.Intersect<
    M.Enum<"foo" | 42>,
    M.Intersect<M.Primitive<string>, M.Const<"foo">>
  >,
  M.Const<"foo">
> = 1;
intersectingIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  M.Intersect<
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>,
    M.Exclude<M.Tuple<[M.Primitive<string>], M.Any>, M.Const<[]>>
  >,
  M.Tuple<[M.Primitive<string>], M.Primitive<string>>
> = 1;
intersectingExclusion;
