import type { A } from "ts-toolbelt";

import type { M } from "~/index";

// --- NEVER ---

const neversNeverExclude: A.Equals<
  M.Exclude<M.Union<M.Const<"B"> | M.Const<"A">>, M.Never>,
  M.Union<M.Const<"B"> | M.Const<"A">>
> = 1;
neversNeverExclude;

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  M.Exclude<M.Union<M.Const<"A"> | M.Const<"B">>, M.Any>,
  M.Union<M.Never>
> = 1;
anysAlwaysExclude;

// --- CONSTS ---

const excludingConst: A.Equals<
  M.Exclude<M.Union<M.Const<"A"> | M.Const<"B">>, M.Const<"B">>,
  M.Union<M.Const<"A"> | M.Never>
> = 1;
excludingConst;

const nonExcludingConst: A.Equals<
  M.Exclude<M.Union<M.Const<"A"> | M.Const<"B">>, M.Const<"C">>,
  M.Union<M.Const<"A"> | M.Const<"B">>
> = 1;
nonExcludingConst;

// --- ENUM ---

const excludingEnum: A.Equals<
  M.Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<42>>,
    M.Enum<"B" | 42>
  >,
  M.Union<M.Const<"A"> | M.Never>
> = 1;
excludingEnum;

const nonExcludingEnum: A.Equals<
  M.Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<42>>,
    M.Enum<"C" | 43>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<42>>
> = 1;
nonExcludingEnum;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  M.Exclude<
    M.Union<M.Primitive<string> | M.Primitive<number>>,
    M.Primitive<number>
  >,
  M.Union<M.Primitive<string> | M.Never>
> = 1;
excludingPrimitive;

const nonExcludingPrimitive: A.Equals<
  M.Exclude<
    M.Union<M.Primitive<string> | M.Primitive<number>>,
    M.Primitive<boolean>
  >,
  M.Union<M.Primitive<string> | M.Primitive<number>>
> = 1;
nonExcludingPrimitive;

// --- ARRAY ---

const excludingArray: A.Equals<
  M.Exclude<
    M.Union<M.Array<M.Primitive<string>> | M.Array<M.Primitive<number>>>,
    M.Array<M.Primitive<number>>
  >,
  M.Union<M.Array<M.Primitive<string>> | M.Never>
> = 1;
excludingArray;

const nonExcludingArray: A.Equals<
  M.Exclude<
    M.Union<M.Array<M.Primitive<string>> | M.Array<M.Primitive<number>>>,
    M.Array<M.Primitive<boolean>>
  >,
  M.Union<M.Array<M.Primitive<string>> | M.Array<M.Primitive<number>>>
> = 1;
nonExcludingArray;

// --- TUPLE ---

const excludingTuple: A.Equals<
  M.Exclude<
    M.Union<M.Tuple<[M.Primitive<string>]> | M.Tuple<[M.Primitive<number>]>>,
    M.Tuple<[M.Primitive<number>]>
  >,
  M.Union<M.Tuple<[M.Primitive<string>]> | M.Never>
> = 1;
excludingTuple;

const nonExcludingTuple: A.Equals<
  M.Exclude<
    M.Union<M.Tuple<[M.Primitive<string>]> | M.Tuple<[M.Primitive<number>]>>,
    M.Tuple<[M.Primitive<boolean>]>
  >,
  M.Union<M.Tuple<[M.Primitive<string>]> | M.Tuple<[M.Primitive<number>]>>
> = 1;
nonExcludingTuple;

// --- OBJECT ---

const excludingObject: A.Equals<
  M.Exclude<
    M.Union<
      | M.Object<{ a: M.Primitive<string> }, "a">
      | M.Object<{ a: M.Primitive<number> }, "a">
    >,
    M.Object<{ a: M.Primitive<number> }, "a">
  >,
  M.Union<M.Object<{ a: M.Primitive<string> }, "a"> | M.Never>
> = 1;
excludingObject;

const nonExcludingObject: A.Equals<
  M.Exclude<
    M.Union<
      | M.Object<{ a: M.Primitive<string> }, "a">
      | M.Object<{ a: M.Primitive<number> }, "a">
    >,
    M.Object<{ a: M.Primitive<boolean> }, "a">
  >,
  M.Union<
    | M.Object<{ a: M.Primitive<string> }, "a">
    | M.Object<{ a: M.Primitive<number> }, "a">
  >
> = 1;
nonExcludingObject;

// --- UNION ---

const excludingUnion: A.Equals<
  M.Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Enum<"C" | 42>>,
    M.Union<M.Enum<"B" | "C"> | M.Const<42>>
  >,
  M.Union<M.Const<"A"> | M.Never | M.Enum<never>>
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  M.Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Enum<"C" | 42>>,
    M.Union<M.Enum<"D" | "E"> | M.Const<43>>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Enum<"C" | 42>>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  M.Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
    M.Intersect<M.Enum<"C" | "D">, M.Const<"D">>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Never>
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  M.Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
    M.Intersect<M.Enum<"D" | "E">, M.Const<"E">>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  M.Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
    M.Exclude<M.Enum<"C" | "D">, M.Const<"C">>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Never>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  M.Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
    M.Exclude<M.Enum<"D" | "E">, M.Const<"D">>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>
> = 1;
nonExcludingExclusion;
