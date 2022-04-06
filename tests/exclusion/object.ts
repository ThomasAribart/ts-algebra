import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  M.Exclude<M.Object<{ a: M.Const<"A"> }, "a">, M.Any>,
  M.Never
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  M.Exclude<M.Object<{ a: M.Const<"A"> }, "a">, M.Never>,
  M.Object<{ a: M.Const<"A"> }, "a">
> = 1;
neversNeverExclude;

// --- CONSTS ---

const constTooSmall: A.Equals<
  M.Exclude<M.Object<{ a: M.Const<"A"> }, "a", M.Any>, M.Const<{ a: "A" }>>,
  M.Object<{ a: M.Const<"A"> }, "a", M.Any>
> = 1;
constTooSmall;

const constTooLarge: A.Equals<
  M.Exclude<M.Object<{ a: M.Const<"A"> }, "a">, M.Const<{ a: "A"; b: "B" }>>,
  M.Object<{ a: M.Const<"A"> }, "a">
> = 1;
constTooLarge;

const constSizeMatches1: A.Equals<
  M.Exclude<M.Object<{ a: M.Const<"A"> }, "a">, M.Const<{ a: "A" }>>,
  M.Never
> = 1;
constSizeMatches1;

const constSizeMatches2: A.Equals<
  M.Exclude<M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a">, M.Const<{ a: "C" }>>,
  M.Object<{ a: M.Enum<"A" | "B"> }, "a">
> = 1;
constSizeMatches2;

// --- ENUM ---

const enumTooSmall: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", M.Any>,
    M.Enum<{ a: "A" } | { b: "B" }>
  >,
  M.Object<{ a: M.Const<"A"> }, "a", M.Any>
> = 1;
enumTooSmall;

const enumTooLarge: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A"> }, "a">,
    M.Enum<{ a: "A"; b: "B" } | { a: "A"; c: "C" }>
  >,
  M.Object<{ a: M.Const<"A"> }, "a">
> = 1;
enumTooLarge;

const enumSizesMatch: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A"> }, "a">,
    M.Enum<{ a: "A" } | { b: "B" }>
  >,
  M.Never
> = 1;
enumSizesMatch;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  M.Exclude<M.Object<{ a: M.Const<"A"> }, "a", M.Any>, M.Primitive<string>>,
  M.Object<{ a: M.Const<"A"> }, "a", M.Any>
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const arraysNeverExclude: A.Equals<
  M.Exclude<M.Object<{ a: M.Const<"A"> }, "a">, M.Array<M.Const<"A">>>,
  M.Object<{ a: M.Const<"A"> }, "a">
> = 1;
arraysNeverExclude;

// --- TUPLE ---

const tuplesNeverExclude: A.Equals<
  M.Exclude<M.Object<{ a: M.Const<"A"> }, "a">, M.Tuple<[M.Const<"A">]>>,
  M.Object<{ a: M.Const<"A"> }, "a">
> = 1;
tuplesNeverExclude;

// --- OBJECT ---

// Both closed
const bothClosed1Key: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Enum<"A" | "B"> }, "a">,
    M.Object<{ a: M.Const<"B"> }, "a">
  >,
  M.Object<{ a: M.Enum<"A"> }, "a">
> = 1;
bothClosed1Key;

const bothClosed2Keys: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Enum<"A" | "B">; b: M.Const<"B"> }, "a" | "b">,
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b">
  >,
  M.Object<{ a: M.Enum<"B">; b: M.Const<"B"> }, "a" | "b">
> = 1;
bothClosed2Keys;

const bothClosed3Keys: A.Equals<
  M.Exclude<
    M.Object<
      { a: M.Enum<"A" | "B">; b: M.Const<"B">; c: M.Const<"C"> },
      "a" | "b" | "c"
    >,
    M.Object<
      { a: M.Const<"B">; b: M.Const<"B">; c: M.Const<"C"> },
      "a" | "b" | "c"
    >
  >,
  M.Object<
    { a: M.Enum<"A">; b: M.Const<"B">; c: M.Const<"C"> },
    "a" | "b" | "c"
  >
> = 1;
bothClosed3Keys;

const bothClosedSizesDontMatch1: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b">,
    M.Object<{ a: M.Const<"A"> }, "a">
  >,
  M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b">
> = 1;
bothClosedSizesDontMatch1;

const bothClosedSizesDontMatch2: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b">,
    M.Object<{ a: M.Const<"A">; c: M.Const<"C"> }, "a" | "c">
  >,
  M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b">
> = 1;
bothClosedSizesDontMatch2;

const bothClosedMoreThan1FreeKey: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Enum<"A" | "B">; b: M.Enum<"A" | "B"> }, "a" | "b">,
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b">
  >,
  M.Object<{ a: M.Enum<"A" | "B">; b: M.Enum<"A" | "B"> }, "a" | "b">
> = 1;
bothClosedMoreThan1FreeKey;

const bothClosedImpossible1: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A"> }, "a">,
    M.Object<{ a: M.Const<"A"> }, "a">
  >,
  M.Never
> = 1;
bothClosedImpossible1;

const bothClosedImpossible2: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a">,
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a">
  >,
  M.Never
> = 1;
bothClosedImpossible2;

const bothClosedImpossible3: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> }, "a">,
    M.Object<{ a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> }, "a">
  >,
  M.Never
> = 1;
bothClosedImpossible3;

const bothClosedOmittableKey1: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a">,
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b">
  >,
  M.Object<{ a: M.Const<"A">; b: M.Never }, "a">
> = 1;
bothClosedOmittableKey1;

const bothClosedOmittableKey2: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> }, "b">,
    M.Object<{ a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> }, "a">
  >,
  M.Object<{ a: M.Never; b: M.Const<"B">; c: M.Const<"C"> }, "b">
> = 1;
bothClosedOmittableKey2;

const bothClosedTooManyOmittableKeys: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> }, "a">,
    M.Object<
      { a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> },
      "a" | "b" | "c"
    >
  >,
  M.Object<{ a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> }, "a">
> = 1;
bothClosedTooManyOmittableKeys;

// Closed value open excluded
const closedValueOpenExcluded1: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Enum<"A" | "B">; b: M.Const<"B"> }, "a">,
    M.Object<{}, never, M.Const<"B">>
  >,
  M.Object<{ a: M.Enum<"A">; b: M.Const<"B"> }, "a">
> = 1;
closedValueOpenExcluded1;

const closedValueOpenExcluded2: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A"> }, "a">,
    M.Object<{}, never, M.Const<"C">>
  >,
  M.Object<{ a: M.Const<"A"> }, "a">
> = 1;
closedValueOpenExcluded2;

// Open value closed excluded
const openValueClosedExcluded: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", M.Any>,
    M.Object<{ a: M.Const<"A"> }, "a">
  >,
  M.Object<{ a: M.Const<"A"> }, "a", M.Any>
> = 1;
openValueClosedExcluded;

// Both open
const bothOpenMatch1: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", M.Any>,
    M.Object<{ a: M.Const<"A"> }, "a", M.Any>
  >,
  M.Never
> = 1;
bothOpenMatch1;

const bothOpenMatch2: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", M.Const<"A">>,
    M.Object<{}, never, M.Const<"A">>
  >,
  M.Never
> = 1;
bothOpenMatch2;

const bothOpenMatch3: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Enum<"A" | "B">; b: M.Const<"B"> }, "a", M.Const<"B">>,
    M.Object<{}, never, M.Const<"B">>
  >,
  M.Object<{ a: M.Enum<"A">; b: M.Const<"B"> }, "a", M.Const<"B">>
> = 1;
bothOpenMatch3;

const bothOpenMoreThan1FreeKey1: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Enum<"A" | "B"> }, never, M.Enum<"A" | "B">>,
    M.Object<{}, never, M.Const<"A">>
  >,
  M.Object<{ a: M.Enum<"A" | "B"> }, never, M.Enum<"A" | "B">>
> = 1;
bothOpenMoreThan1FreeKey1;

const bothOpenMoreThan1FreeKey2: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", M.Any>,
    M.Object<{}, never, M.Const<"A">>
  >,
  M.Object<{ a: M.Const<"A"> }, "a", M.Any>
> = 1;
bothOpenMoreThan1FreeKey2;

const bothOpenKeyAdded: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Enum<"A" | "B"> }, "a", M.Enum<"A" | "B">>,
    M.Object<
      { a: M.Enum<"A" | "B">; b: M.Const<"B"> },
      "a" | "b",
      M.Primitive<string>
    >
  >,
  M.Object<{ a: M.Enum<"A" | "B">; b: M.Enum<"A"> }, "a", M.Enum<"A" | "B">>
> = 1;
bothOpenKeyAdded;

// --- UNION ---

const excludingUnion: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a">,
    M.Union<M.Const<{ a: "C" }> | M.Object<{ a: M.Const<"B"> }, "a">>
  >,
  M.Object<{ a: M.Enum<"A"> }, "a">
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Enum<"A" | "B"> }, "a">,
    M.Union<M.Const<{ a: "C" }> | M.Object<{ a: M.Const<"D"> }, "a">>
  >,
  M.Object<{ a: M.Enum<"A" | "B"> }, "a">
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a">,
    M.Intersect<M.Const<{ a: "C" }>, M.Object<{ a: M.Primitive<string> }, "a">>
  >,
  M.Object<{ a: M.Enum<"A" | "B"> }, "a">
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Enum<"A" | "B"> }, "a">,
    M.Intersect<M.Const<{ a: "D" }>, M.Object<{ a: M.Primitive<string> }, "a">>
  >,
  M.Object<{ a: M.Enum<"A" | "B"> }, "a">
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a">,
    M.Exclude<
      M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a">,
      M.Const<{ a: "C" }>
    >
  >,
  M.Object<{ a: M.Enum<"C"> }, "a">
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  M.Exclude<
    M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a">,
    M.Exclude<
      M.Object<{ a: M.Enum<"A" | "B" | "C"> }, never>,
      M.Object<{ a: M.Primitive<string> }, "a">
    >
  >,
  M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a">
> = 1;
nonExcludingExclusion;
