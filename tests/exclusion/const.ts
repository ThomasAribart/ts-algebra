import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const anysAlwaysExclude: A.Equals<M.Exclude<M.Const<"A">, M.Any>, M.Never> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  M.Exclude<M.Const<"A">, M.Never>,
  M.Const<"A">
> = 1;
neversNeverExclude;

// --- CONSTS ---

const excludingConst: A.Equals<
  M.Exclude<M.Const<"A">, M.Const<"A">>,
  M.Never
> = 1;
excludingConst;

const nonExcludingConst: A.Equals<
  M.Exclude<M.Const<"A">, M.Const<"B">>,
  M.Const<"A">
> = 1;
nonExcludingConst;

// --- ENUM ---

const excludingEnum: A.Equals<
  M.Exclude<M.Const<"A">, M.Enum<"A" | "B">>,
  M.Never
> = 1;
excludingEnum;

const nonExcludingEnum: A.Equals<
  M.Exclude<M.Const<"A">, M.Enum<"B">>,
  M.Const<"A">
> = 1;
nonExcludingEnum;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  M.Exclude<M.Const<"A">, M.Primitive<string>>,
  M.Never
> = 1;
excludingPrimitive;

const nonExcludingPrimitive: A.Equals<
  M.Exclude<M.Const<"A">, M.Primitive<number>>,
  M.Const<"A">
> = 1;
nonExcludingPrimitive;

// --- ARRAY ---

const excludingArray1: A.Equals<
  M.Exclude<M.Const<["A"]>, M.Array<M.Primitive<string>>>,
  M.Never
> = 1;
excludingArray1;

const excludingArray2: A.Equals<
  M.Exclude<M.Const<["A"]>, M.Array<M.Const<"A">>>,
  M.Never
> = 1;
excludingArray2;

const nonExcludingArray: A.Equals<
  M.Exclude<M.Const<["A"]>, M.Array<M.Primitive<number>>>,
  M.Const<["A"]>
> = 1;
nonExcludingArray;

// --- TUPLE ---

const excludingTuple1: A.Equals<
  M.Exclude<M.Const<["A"]>, M.Tuple<[M.Primitive<string>], M.Any>>,
  M.Never
> = 1;
excludingTuple1;

const excludingTuple2: A.Equals<
  M.Exclude<M.Const<["A"]>, M.Tuple<[M.Const<"A">], M.Any>>,
  M.Never
> = 1;
excludingTuple2;

const nonExcludingTuple: A.Equals<
  M.Exclude<M.Const<["A"]>, M.Tuple<[M.Primitive<number>], M.Any>>,
  M.Const<["A"]>
> = 1;
nonExcludingTuple;

// --- OBJECT ---

const nonObjectConst: A.Equals<
  M.Exclude<M.Const<["A", "B"]>, M.Object<{}, never, M.Primitive<string>>>,
  M.Const<["A", "B"]>
> = 1;
nonObjectConst;

const excludingClosedObject1: A.Equals<
  M.Exclude<M.Const<{ a: "A" }>, M.Object<{ a: M.Primitive<string> }, "a">>,
  M.Never
> = 1;
excludingClosedObject1;

const excludingClosedObject2: A.Equals<
  M.Exclude<
    M.Const<{ a: "A"; b: "B" }>,
    M.Object<{ a: M.Enum<"A" | "B">; b: M.Enum<"A" | "B"> }, "a">
  >,
  M.Never
> = 1;
excludingClosedObject2;

const nonExcludingClosedObject: A.Equals<
  M.Exclude<M.Const<{ a: "A" }>, M.Object<{ a: M.Const<"B"> }, "a">>,
  M.Const<{ a: "A" }>
> = 1;
nonExcludingClosedObject;

const closedObjectSizesDontMatch1: A.Equals<
  M.Exclude<M.Const<{ a: "A"; b: "B" }>, M.Object<{ a: M.Const<"A"> }, "a">>,
  M.Const<{ a: "A"; b: "B" }>
> = 1;
closedObjectSizesDontMatch1;

const closedObjectSizesDontMatch2: A.Equals<
  M.Exclude<
    M.Const<{ a: "A"; b: "B" }>,
    M.Object<{ a: M.Const<"A">; c: M.Const<"C"> }, "a" | "c">
  >,
  M.Const<{ a: "A"; b: "B" }>
> = 1;
closedObjectSizesDontMatch2;

const excludingOpenObject1: A.Equals<
  M.Exclude<
    M.Const<{ a: "A"; b: "B" }>,
    M.Object<{ a: M.Const<"A"> }, never, M.Const<"B">>
  >,
  M.Never
> = 1;
excludingOpenObject1;

const excludingOpenObject2: A.Equals<
  M.Exclude<
    M.Const<{ a: "A"; b: "B" }>,
    M.Object<{}, never, M.Union<M.Const<"A"> | M.Const<"B">>>
  >,
  M.Never
> = 1;
excludingOpenObject2;

const nonExcludingOpenObject: A.Equals<
  M.Exclude<M.Const<{ a: "A" }>, M.Object<{}, never, M.Const<"C">>>,
  M.Const<{ a: "A" }>
> = 1;
nonExcludingOpenObject;

// --- UNION ---

const excludingUnion1: A.Equals<
  M.Exclude<M.Const<"A">, M.Union<M.Const<"A">>>,
  M.Never
> = 1;
excludingUnion1;

const excludingUnion2: A.Equals<
  M.Exclude<M.Const<"A">, M.Union<M.Const<"B"> | M.Enum<"A" | "C">>>,
  M.Never
> = 1;
excludingUnion2;

const excludingUnion3: A.Equals<
  M.Exclude<M.Const<"A">, M.Union<M.Primitive<string>>>,
  M.Never
> = 1;
excludingUnion3;

const nonExcludingUnion: A.Equals<
  M.Exclude<M.Const<"A">, M.Union<M.Const<"B"> | M.Const<"C">>>,
  M.Const<"A">
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  M.Exclude<M.Const<"A">, M.Intersect<M.Primitive<string>, M.Enum<"A" | "B">>>,
  M.Never
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  M.Exclude<M.Const<"A">, M.Intersect<M.Primitive<string>, M.Enum<"B" | "C">>>,
  M.Const<"A">
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  M.Exclude<M.Const<"A">, M.Exclude<M.Primitive<string>, M.Const<"B">>>,
  M.Never
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  M.Exclude<M.Const<"A">, M.Exclude<M.Enum<"A" | "B">, M.Const<"A">>>,
  M.Const<"A">
> = 1;
nonExcludingExclusion;
