import type { A } from "ts-toolbelt";

import type { M } from "~/index";

// --- NEVER ---

const anyToNever: A.Equals<M.Intersect<M.Any, M.Never>, M.Never> = 1;
anyToNever;

// --- ANY ---

const anyToAny: A.Equals<M.Intersect<M.Any, M.Any>, M.Any> = 1;
anyToAny;

const anyToSerializedAny: A.Equals<
  M.Intersect<M.Any, M.Any<true, "yolo">>,
  M.Any<true, "yolo">
> = 1;
anyToSerializedAny;

const serializedAnyToAny: A.Equals<
  M.Intersect<M.Any<true, "yolo">, M.Any>,
  M.Any<true, "yolo">
> = 1;
serializedAnyToAny;

const serializedAnyToSerializedAny: A.Equals<
  M.Intersect<M.Any<true, "yolo" | "swag">, M.Any<true, "yolo">>,
  M.Any<true, "yolo">
> = 1;
serializedAnyToSerializedAny;

// --- CONSTS ---

const anyToConst: A.Equals<
  M.Intersect<M.Any, M.Const<"foo">>,
  M.Const<"foo">
> = 1;
anyToConst;

const anyToSerializedConst: A.Equals<
  M.Intersect<M.Any, M.Const<"2022-01-01", true, Date>>,
  M.Const<"2022-01-01", true, Date>
> = 1;
anyToSerializedConst;

const serializedAnyToConst: A.Equals<
  M.Intersect<M.Any<true, Date>, M.Const<"2022-01-01">>,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedAnyToConst;

const serializedAnyToSerializedConst: A.Equals<
  M.Intersect<M.Any<true, unknown>, M.Const<"2022-01-01", true, Date>>,
  M.Const<"2022-01-01", true, Date>
> = 1;
serializedAnyToSerializedConst;

// --- ENUM ---

const anyToEnum: A.Equals<
  M.Intersect<M.Any, M.Enum<"foo" | "bar" | 42>>,
  M.Enum<"foo" | "bar" | 42>
> = 1;
anyToEnum;

const anyToSerializedEnum: A.Equals<
  M.Intersect<M.Any, M.Enum<"2022-01-01" | "2023-01-01", true, Date>>,
  M.Enum<"2022-01-01" | "2023-01-01", true, Date>
> = 1;
anyToSerializedEnum;

const serializedAnyToEnum: A.Equals<
  M.Intersect<M.Any<true, Date>, M.Enum<"2022-01-01" | "2023-01-01">>,
  M.Enum<"2022-01-01" | "2023-01-01", true, Date>
> = 1;
serializedAnyToEnum;

const serializedAnyToSerializedEnum: A.Equals<
  M.Intersect<
    M.Any<true, unknown>,
    M.Enum<"2022-01-01" | "2023-01-01", true, Date>
  >,
  M.Enum<"2022-01-01" | "2023-01-01", true, Date>
> = 1;
serializedAnyToSerializedEnum;

// --- PRIMITIVES ---

const anyToPrimitive: A.Equals<
  M.Intersect<M.Any, M.Primitive<string>>,
  M.Primitive<string>
> = 1;
anyToPrimitive;

const anyToSerializedPrimitive: A.Equals<
  M.Intersect<M.Any, M.Primitive<string, true, Date>>,
  M.Primitive<string, true, Date>
> = 1;
anyToSerializedPrimitive;

const serializedAnyToPrimitive: A.Equals<
  M.Intersect<M.Any<true, Date>, M.Primitive<string>>,
  M.Primitive<string, true, Date>
> = 1;
serializedAnyToPrimitive;

const serializedAnyToSerializedPrimitive: A.Equals<
  M.Intersect<M.Any<true, unknown>, M.Primitive<string, true, Date>>,
  M.Primitive<string, true, Date>
> = 1;
serializedAnyToSerializedPrimitive;

// --- ARRAY ---

const anyToArray: A.Equals<
  M.Intersect<M.Any, M.Array<M.Primitive<string>>>,
  M.Array<M.Primitive<string>>
> = 1;
anyToArray;

const anyToSerializedArray: A.Equals<
  M.Intersect<M.Any, M.Array<M.Primitive<string>, true, Date[]>>,
  M.Array<M.Primitive<string>, true, Date[]>
> = 1;
anyToSerializedArray;

const serializedAnyToArray: A.Equals<
  M.Intersect<M.Any<true, Date[]>, M.Array<M.Primitive<string>>>,
  M.Array<M.Primitive<string>, true, Date[]>
> = 1;
serializedAnyToArray;

const serializedAnyToSerializedArray: A.Equals<
  M.Intersect<
    M.Any<true, unknown[]>,
    M.Array<M.Primitive<string>, true, Date[]>
  >,
  M.Array<M.Primitive<string>, true, Date[] & unknown[]>
> = 1;
serializedAnyToSerializedArray;

// --- TUPLE ---

const anyToTuple: A.Equals<
  M.Intersect<M.Any, M.Tuple<[M.Primitive<string>], M.Any>>,
  M.Tuple<[M.Primitive<string>], M.Any>
> = 1;
anyToTuple;

const anyToSerializedTuple: A.Equals<
  M.Intersect<M.Any, M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>>,
  M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>
> = 1;
anyToSerializedTuple;

const serializedAnyToTuple: A.Equals<
  M.Intersect<M.Any<true, Date[]>, M.Tuple<[M.Primitive<string>]>>,
  M.Tuple<[M.Primitive<string>], M.Never, true, Date[]>
> = 1;
serializedAnyToTuple;

const serializedAnyToSerializedTuple: A.Equals<
  M.Intersect<
    M.Any<true, Date[]>,
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>
  >,
  M.Tuple<[M.Primitive<string>], M.Never, true, Date[] & [Date]>
> = 1;
serializedAnyToSerializedTuple;

// --- OBJECT ---

const anyToObject: A.Equals<M.Intersect<M.Any, M.Object>, M.Object> = 1;
anyToObject;

const anyToSerializedObject: A.Equals<
  M.Intersect<
    M.Any,
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
anyToSerializedObject;

const serializedAnyToObject: A.Equals<
  M.Intersect<
    M.Any<true, { date: Date }>,
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
serializedAnyToObject;

const serializedAnyToSerializedObject: A.Equals<
  M.Intersect<
    M.Any<true, { date: Date }>,
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
    { date: Date } & { date: Date }
  >
> = 1;
serializedAnyToSerializedObject;

// --- UNION ---

const anyToUnion: A.Equals<
  M.Intersect<M.Any, M.Union<M.Const<"foo"> | M.Array<M.Primitive<number>>>>,
  M.Union<M.Const<"foo"> | M.Array<M.Primitive<number>>>
> = 1;
anyToUnion;

// --- INTERSECTION ---

const anyToIntersection: A.Equals<
  M.Intersect<M.Any, M.Intersect<M.Enum<"A" | "B">, M.Const<"A">>>,
  M.Const<"A">
> = 1;
anyToIntersection;

// --- EXCLUSION ---

const anyToExclusion: A.Equals<
  M.Intersect<M.Any, M.Exclude<M.Enum<"A" | "B">, M.Const<"A">>>,
  M.Enum<"B">
> = 1;
anyToExclusion;
