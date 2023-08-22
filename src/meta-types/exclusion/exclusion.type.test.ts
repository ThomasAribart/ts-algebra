import type { A } from "ts-toolbelt";

import type { M } from "~/index";

// --- NEVER ---

const neversNeverExclude: A.Equals<
  M.Exclude<M.Exclude<M.Primitive<string>, M.Const<"A">>, M.Never>,
  M.Primitive<string>
> = 1;
neversNeverExclude;

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  M.Exclude<M.Exclude<M.Primitive<string>, M.Const<"A">>, M.Any>,
  M.Never
> = 1;
anysAlwaysExclude;

// --- CONSTS ---

const excludingConst: A.Equals<
  M.Exclude<M.Exclude<M.Enum<"A" | "B" | "C">, M.Const<"A">>, M.Const<"B">>,
  M.Enum<"C">
> = 1;
excludingConst;

// --- ENUM ---

const excludingEnum: A.Equals<
  M.Exclude<
    M.Exclude<M.Enum<"A" | "B" | "C" | "D">, M.Const<"A">>,
    M.Enum<"B" | "C">
  >,
  M.Enum<"D">
> = 1;
excludingEnum;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  M.Exclude<
    M.Exclude<
      M.Union<M.Primitive<string> | M.Primitive<number> | M.Const<"A">>,
      M.Const<"A">
    >,
    M.Primitive<number>
  >,
  M.Union<M.Primitive<string> | M.Never>
> = 1;
excludingPrimitive;

// --- ARRAY ---

const excludingArray1: A.Equals<
  M.Exclude<
    M.Exclude<M.Array<M.Primitive<string>>, M.Never>,
    M.Array<M.Primitive<string>>
  >,
  M.Never
> = 1;
excludingArray1;

const excludingArray2: A.Equals<
  M.Exclude<
    M.Exclude<
      M.Array<M.Union<M.Primitive<string> | M.Primitive<number>>>,
      M.Never
    >,
    M.Array<M.Primitive<string>>
  >,
  M.Array<M.Union<M.Primitive<string> | M.Primitive<number>>>
> = 1;
excludingArray2;

// --- TUPLE ---

const excludingTuple: A.Equals<
  M.Exclude<
    M.Exclude<M.Tuple<[M.Enum<"A" | "B" | "C">]>, M.Const<["A"]>>,
    M.Const<["B"]>
  >,
  M.Tuple<[M.Enum<"C">]>
> = 1;
excludingTuple;

// --- OBJECT ---

const excludingObject: A.Equals<
  M.Exclude<
    M.Exclude<M.Object<{ a: M.Enum<"A" | "B"> }, "a">, M.Never>,
    M.Object<{ a: M.Const<"B"> }, "a">
  >,
  M.Object<{ a: M.Enum<"A"> }, "a">
> = 1;
excludingObject;

// --- UNION ---

const excludingUnion: A.Equals<
  M.Exclude<
    M.Exclude<
      M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
      M.Const<"A">
    >,
    M.Union<M.Const<"B"> | M.Const<"C">>
  >,
  M.Union<M.Const<"D"> | M.Never>
> = 1;
excludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  M.Exclude<
    M.Exclude<
      M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
      M.Const<"A">
    >,
    M.Intersect<
      M.Enum<"B" | "C">,
      M.Union<M.Primitive<string> | M.Primitive<number>>
    >
  >,
  M.Union<M.Const<"D"> | M.Never>
> = 1;
excludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  M.Exclude<
    M.Exclude<
      M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
      M.Const<"A">
    >,
    M.Exclude<M.Enum<"B" | "C">, M.Const<"B">>
  >,
  M.Union<M.Const<"B"> | M.Const<"D"> | M.Never>
> = 1;
excludingExclusion;
