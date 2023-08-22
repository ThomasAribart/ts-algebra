import type { A } from "ts-toolbelt";

import type { M } from "~/index";

// --- NEVER ---

const neversNeverExclude: A.Equals<
  M.Exclude<M.Intersect<M.Enum<"A" | "B">, M.Const<"A">>, M.Never>,
  M.Const<"A">
> = 1;
neversNeverExclude;

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  M.Exclude<M.Intersect<M.Enum<"A" | "B">, M.Const<"A">>, M.Any>,
  M.Never
> = 1;
anysAlwaysExclude;

// --- CONSTS ---

const excludingConst: A.Equals<
  M.Exclude<M.Intersect<M.Const<"A">, M.Primitive<string>>, M.Const<"A">>,
  M.Never
> = 1;
excludingConst;

const nonExcludingConst: A.Equals<
  M.Exclude<M.Intersect<M.Const<"A">, M.Primitive<string>>, M.Const<"B">>,
  M.Const<"A">
> = 1;
nonExcludingConst;

// --- ENUM ---

const excludingEnum: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<42>>,
      M.Primitive<string>
    >,
    M.Enum<"B" | "C">
  >,
  M.Union<M.Const<"A"> | M.Never>
> = 1;
excludingEnum;

const nonExcludingEnum: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<42>>,
      M.Primitive<string>
    >,
    M.Enum<"C" | "D">
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Never>
> = 1;
nonExcludingEnum;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<M.Primitive<string> | M.Primitive<number>>,
      M.Primitive<string>
    >,
    M.Primitive<string>
  >,
  M.Union<M.Never>
> = 1;
excludingPrimitive;

const nonExcludingPrimitive: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<M.Primitive<string> | M.Primitive<number>>,
      M.Primitive<string>
    >,
    M.Primitive<boolean>
  >,
  M.Union<M.Primitive<string> | M.Never>
> = 1;
nonExcludingPrimitive;

// --- ARRAY ---

const excludingArray: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<
        | M.Array<M.Primitive<string>>
        | M.Array<M.Primitive<number>>
        | M.Array<M.Primitive<boolean>>
      >,
      M.Union<M.Array<M.Primitive<string>> | M.Array<M.Primitive<number>>>
    >,
    M.Array<M.Primitive<number>>
  >,
  M.Union<M.Union<M.Array<M.Primitive<string>> | M.Never> | M.Union<M.Never>>
> = 1;
excludingArray;

const nonExcludingArray: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<
        | M.Array<M.Primitive<string>>
        | M.Array<M.Primitive<number>>
        | M.Array<M.Primitive<boolean>>
      >,
      M.Union<M.Array<M.Primitive<string>> | M.Array<M.Primitive<number>>>
    >,
    M.Array<M.Primitive<boolean>>
  >,
  M.Union<
    | M.Union<M.Never>
    | M.Union<M.Never | M.Array<M.Primitive<string>>>
    | M.Union<M.Never | M.Array<M.Primitive<number>>>
  >
> = 1;
nonExcludingArray;

// --- TUPLE ---

const excludingTuple: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<
        | M.Tuple<[M.Primitive<string>]>
        | M.Tuple<[M.Primitive<number>]>
        | M.Tuple<[M.Primitive<boolean>]>
      >,
      M.Union<M.Tuple<[M.Primitive<string>]> | M.Tuple<[M.Primitive<number>]>>
    >,
    M.Tuple<[M.Primitive<number>]>
  >,
  M.Union<M.Union<M.Never> | M.Union<M.Never | M.Tuple<[M.Primitive<string>]>>>
> = 1;
excludingTuple;

const nonExcludingTuple: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<
        | M.Tuple<[M.Primitive<string>]>
        | M.Tuple<[M.Primitive<number>]>
        | M.Tuple<[M.Primitive<boolean>]>
      >,
      M.Union<M.Tuple<[M.Primitive<string>]> | M.Tuple<[M.Primitive<number>]>>
    >,
    M.Tuple<[M.Primitive<boolean>]>
  >,
  M.Union<
    | M.Union<M.Never>
    | M.Union<M.Never | M.Tuple<[M.Primitive<string>]>>
    | M.Union<M.Never | M.Tuple<[M.Primitive<number>]>>
  >
> = 1;
nonExcludingTuple;

// --- OBJECT ---

const excludingObject: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<
        | M.Object<{ a: M.Primitive<string> }, "a">
        | M.Object<{ a: M.Primitive<number> }, "a">
        | M.Object<{ a: M.Primitive<boolean> }, "a">
      >,
      M.Union<
        | M.Object<{ a: M.Primitive<string> }, "a">
        | M.Object<{ a: M.Primitive<number> }, "a">
      >
    >,
    M.Object<{ a: M.Primitive<number> }, "a">
  >,
  M.Union<
    | M.Union<M.Never>
    | M.Union<M.Never | M.Object<{ a: M.Primitive<string> }, "a">>
  >
> = 1;
excludingObject;

const nonExcludingObject: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<
        | M.Object<{ a: M.Primitive<string> }, "a">
        | M.Object<{ a: M.Primitive<number> }, "a">
        | M.Object<{ a: M.Primitive<boolean> }, "a">
      >,
      M.Union<
        | M.Object<{ a: M.Primitive<string> }, "a">
        | M.Object<{ a: M.Primitive<number> }, "a">
      >
    >,
    M.Object<{ a: M.Primitive<boolean> }, "a">
  >,
  M.Union<
    | M.Union<M.Never>
    | M.Union<M.Never | M.Object<{ a: M.Primitive<string> }, "a">>
    | M.Union<M.Never | M.Object<{ a: M.Primitive<number> }, "a">>
  >
> = 1;
nonExcludingObject;

// --- UNION ---

const excludingUnion: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Enum<"A" | "B" | "C" | 42 | true>,
      M.Union<M.Primitive<string> | M.Primitive<number>>
    >,
    M.Union<M.Enum<"B" | "C"> | M.Const<42>>
  >,
  M.Union<M.Enum<"A"> | M.Enum<never>>
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Enum<"A" | "B" | 42 | true>,
      M.Union<M.Primitive<string> | M.Primitive<number>>
    >,
    M.Union<M.Enum<"C" | "D"> | M.Const<43>>
  >,
  M.Union<M.Enum<"A" | "B"> | M.Enum<42>>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersect: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<
        M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D"> | M.Const<42>
      >,
      M.Primitive<string>
    >,
    M.Intersect<M.Enum<"C" | "D">, M.Const<"D">>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Never>
> = 1;
excludingIntersect;

const nonExcludingIntersect: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<
        M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D"> | M.Const<42>
      >,
      M.Primitive<string>
    >,
    M.Intersect<M.Enum<"D" | "E">, M.Const<"E">>
  >,
  M.Union<M.Never | M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>
> = 1;
nonExcludingIntersect;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<
        M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D"> | M.Const<42>
      >,
      M.Primitive<string>
    >,
    M.Exclude<M.Enum<"C" | "D">, M.Const<"C">>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Never>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  M.Exclude<
    M.Intersect<
      M.Union<
        M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D"> | M.Const<42>
      >,
      M.Primitive<string>
    >,
    M.Exclude<M.Enum<"D" | "E">, M.Const<"D">>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D"> | M.Never>
> = 1;
nonExcludingExclusion;
