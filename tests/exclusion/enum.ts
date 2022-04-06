import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  M.Exclude<M.Enum<"A" | "B">, M.Any>,
  M.Never
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  M.Exclude<M.Enum<"A" | "B">, M.Never>,
  M.Enum<"A" | "B">
> = 1;
neversNeverExclude;

// --- CONSTS ---

const excludingConst: A.Equals<
  M.Exclude<M.Enum<"A" | "B">, M.Const<"A">>,
  M.Enum<"B">
> = 1;
excludingConst;

const nonExcludingConst: A.Equals<
  M.Exclude<M.Enum<"A" | "B">, M.Const<"C">>,
  M.Enum<"A" | "B">
> = 1;
nonExcludingConst;

// --- ENUM ---

const excludingEnum: A.Equals<
  M.Exclude<M.Enum<"A" | "B" | "C">, M.Enum<"A" | "B">>,
  M.Enum<"C">
> = 1;
excludingEnum;

const nonExcludingEnum: A.Equals<
  M.Exclude<M.Enum<"A" | "B">, M.Enum<"C" | "D">>,
  M.Enum<"A" | "B">
> = 1;
nonExcludingEnum;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  M.Exclude<M.Enum<"A" | "B" | 42>, M.Primitive<string>>,
  M.Enum<42>
> = 1;
excludingPrimitive;

const nonExcludingPrimitive: A.Equals<
  M.Exclude<M.Enum<"A" | "B">, M.Primitive<number>>,
  M.Enum<"A" | "B">
> = 1;
nonExcludingPrimitive;

// --- ARRAY ---

const excludingArray: A.Equals<
  M.Exclude<M.Enum<["A"] | ["B"] | [42] | "C">, M.Array<M.Primitive<string>>>,
  M.Enum<[42] | "C">
> = 1;
excludingArray;

const nonExcludingArray: A.Equals<
  M.Exclude<M.Enum<["A"] | ["B"] | 42>, M.Array<M.Primitive<number>>>,
  M.Enum<["A"] | ["B"] | 42>
> = 1;
nonExcludingArray;

// --- TUPLE ---

const excludingTuple1: A.Equals<
  M.Exclude<M.Enum<["A"] | [42]>, M.Tuple<[M.Primitive<string>], true>>,
  M.Enum<[42]>
> = 1;
excludingTuple1;

const excludingTuple2: A.Equals<
  M.Exclude<M.Enum<["A", "B"] | [42]>, M.Tuple<[M.Const<"A">], true>>,
  M.Enum<[42]>
> = 1;
excludingTuple2;

const nonExcludingTuple: A.Equals<
  M.Exclude<M.Enum<["A", "B"]>, M.Tuple<[M.Primitive<number>], true>>,
  M.Enum<["A", "B"]>
> = 1;
nonExcludingTuple;

// --- OBJECT ---

const nonObjectEnum: A.Equals<
  M.Exclude<M.Enum<["A", "B"] | 42>, M.Object<{}, never, M.Primitive<string>>>,
  M.Enum<["A", "B"] | 42>
> = 1;
nonObjectEnum;

const excludingClosedObject1: A.Equals<
  M.Exclude<
    M.Enum<{ a: "A" } | { a: "B" }>,
    M.Object<{ a: M.Primitive<string> }, "a">
  >,
  M.Enum<never>
> = 1;
excludingClosedObject1;

const excludingClosedObject2: A.Equals<
  M.Exclude<
    M.Enum<{ a: "A" } | { a: "B" }>,
    M.Object<{ a: M.Const<"A"> }, "a">
  >,
  M.Enum<{ a: "B" }>
> = 1;
excludingClosedObject2;

const nonExcludingClosedObject: A.Equals<
  M.Exclude<
    M.Enum<{ a: "A" } | { a: "B" }>,
    M.Object<{ a: M.Const<"C"> }, "a">
  >,
  M.Enum<{ a: "A" } | { a: "B" }>
> = 1;
nonExcludingClosedObject;

const closedObjectSizesDontMatch1: A.Equals<
  M.Exclude<
    M.Enum<{ a: "A" } | { a: "A"; b: "B" }>,
    M.Object<{ a: M.Const<"A"> }, "a">
  >,
  M.Enum<{ a: "A"; b: "B" }>
> = 1;
closedObjectSizesDontMatch1;

const closedObjectSizesDontMatch2: A.Equals<
  M.Exclude<
    M.Enum<{ a: "A"; b: "B" } | { a: "A"; c: "C" }>,
    M.Object<{ a: M.Const<"A">; c: M.Const<"C"> }, "a" | "c">
  >,
  M.Enum<{ a: "A"; b: "B" }>
> = 1;
closedObjectSizesDontMatch2;

const excludingOpenObject1: A.Equals<
  M.Exclude<
    M.Enum<{ a: "A"; b: "B" } | { a: "A"; b: "C" }>,
    M.Object<{ a: M.Const<"A"> }, never, M.Const<"B">>
  >,
  M.Enum<{ a: "A"; b: "C" }>
> = 1;
excludingOpenObject1;

const excludingOpenObject2: A.Equals<
  M.Exclude<
    M.Enum<{ a: "A"; b: "B" } | { a: "A"; b: "C" }>,
    M.Object<{}, never, M.Union<M.Const<"A"> | M.Const<"B">>>
  >,
  M.Enum<{ a: "A"; b: "C" }>
> = 1;
excludingOpenObject2;

const nonExcludingOpenObject: A.Equals<
  M.Exclude<M.Enum<{ a: "A" } | { a: "B" }>, M.Object<{}, never, M.Const<"C">>>,
  M.Enum<{ a: "A" } | { a: "B" }>
> = 1;
nonExcludingOpenObject;

// --- UNION ---

const excludingUnion1: A.Equals<
  M.Exclude<M.Enum<"A" | "B">, M.Union<M.Enum<"B"> | M.Enum<"C">>>,
  M.Enum<"A">
> = 1;
excludingUnion1;

const excludingUnion2: A.Equals<
  M.Exclude<M.Enum<"A" | "B">, M.Union<M.Const<"A"> | M.Const<"B">>>,
  M.Enum<never>
> = 1;
excludingUnion2;

const nonExcludingUnion: A.Equals<
  M.Exclude<M.Enum<"A" | "B">, M.Union<M.Const<"C"> | M.Primitive<number>>>,
  M.Enum<"A" | "B">
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  M.Exclude<
    M.Enum<"A" | "C">,
    M.Intersect<M.Primitive<string>, M.Enum<"A" | "B">>
  >,
  M.Enum<"C">
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  M.Exclude<
    M.Enum<"A" | "B">,
    M.Intersect<M.Primitive<string>, M.Enum<"C" | "D">>
  >,
  M.Enum<"A" | "B">
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  M.Exclude<M.Enum<"A" | "B">, M.Exclude<M.Primitive<string>, M.Const<"B">>>,
  M.Enum<never>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  M.Exclude<
    M.Enum<"A" | "B">,
    M.Exclude<M.Enum<"A" | "B" | "C">, M.Enum<"A" | "B">>
  >,
  M.Enum<"A" | "B">
> = 1;
nonExcludingExclusion;
