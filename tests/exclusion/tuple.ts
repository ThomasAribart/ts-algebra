import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">, M.Const<"B">], true>, M.Any>,
  M.Never
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">, M.Const<"B">], true>, M.Never>,
  M.Tuple<[M.Const<"A">, M.Const<"B">], true>
> = 1;
neversNeverExclude;

// --- CONSTS ---

const constTooSmall: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], true>, M.Const<["A"]>>,
  M.Tuple<[M.Const<"A">], true>
> = 1;
constTooSmall;

const constTooLarge: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">]>, M.Const<["A", "B"]>>,
  M.Tuple<[M.Const<"A">]>
> = 1;
constTooLarge;

const constSizeMatches: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">]>, M.Const<["A"]>>,
  M.Never
> = 1;
constSizeMatches;

// --- ENUM ---

const enumTooSmall: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], true>, M.Enum<["A"] | ["B"]>>,
  M.Tuple<[M.Const<"A">], true>
> = 1;
enumTooSmall;

const enumTooLarge: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">]>, M.Enum<["A", "B"] | ["A", "C"]>>,
  M.Tuple<[M.Const<"A">]>
> = 1;
enumTooLarge;

const enumSizesMatch: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">]>, M.Enum<["A"] | ["B"]>>,
  M.Never
> = 1;
enumSizesMatch;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], true>, M.Primitive<string>>,
  M.Tuple<[M.Const<"A">], true>
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const arrayTooSmall1: A.Equals<
  M.Exclude<M.Tuple<[M.Primitive<string>], true>, M.Array<M.Primitive<string>>>,
  M.Tuple<[M.Primitive<string>], true>
> = 1;
arrayTooSmall1;

const arrayTooSmall2: A.Equals<
  M.Exclude<
    M.Tuple<[M.Primitive<string>], true, M.Enum<"A" | 42>>,
    M.Array<M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>], true, M.Enum<"A" | 42>>
> = 1;
arrayTooSmall2;

const excludingArray1: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">], true, M.Primitive<string>>,
    M.Array<M.Primitive<string>>
  >,
  M.Never
> = 1;
excludingArray1;

const excludingArray2: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | 42>], true, M.Primitive<string>>,
    M.Array<M.Primitive<string>>
  >,
  M.Tuple<[M.Enum<42>], true, M.Primitive<string>>
> = 1;
excludingArray2;

const excludingArray3: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | 42>, M.Const<"A">], true, M.Primitive<string>>,
    M.Array<M.Primitive<string>>
  >,
  M.Tuple<[M.Enum<42>, M.Const<"A">], true, M.Primitive<string>>
> = 1;
excludingArray3;

const nonExcludingArray1: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | 42>, M.Enum<"A" | 42>], true, M.Primitive<string>>,
    M.Array<M.Primitive<string>>
  >,
  M.Tuple<[M.Enum<"A" | 42>, M.Enum<"A" | 42>], true, M.Primitive<string>>
> = 1;
nonExcludingArray1;

const nonExcludingArray2: A.Equals<
  M.Exclude<
    M.Tuple<
      [M.Primitive<string>, M.Primitive<boolean>],
      true,
      M.Primitive<string>
    >,
    M.Array<M.Primitive<string>>
  >,
  M.Tuple<
    [M.Primitive<string>, M.Primitive<boolean>],
    true,
    M.Primitive<string>
  >
> = 1;
nonExcludingArray2;

// --- TUPLE ---

// Both closed
const bothClosed1Item: A.Equals<
  M.Exclude<M.Tuple<[M.Enum<"A" | "B">]>, M.Tuple<[M.Const<"B">]>>,
  M.Tuple<[M.Enum<"A">]>
> = 1;
bothClosed1Item;

const bothClosed2Items: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">, M.Const<"B">]>,
    M.Tuple<[M.Const<"A">, M.Const<"B">]>
  >,
  M.Tuple<[M.Enum<"B">, M.Const<"B">]>
> = 1;
bothClosed2Items;

const bothClosed3Keys: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">, M.Const<"B">, M.Const<"C">]>,
    M.Tuple<[M.Const<"B">, M.Const<"B">, M.Const<"C">]>
  >,
  M.Tuple<[M.Enum<"A">, M.Const<"B">, M.Const<"C">]>
> = 1;
bothClosed3Keys;

const bothClosedSizesDontMatch1: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">, M.Const<"B">]>, M.Tuple<[M.Const<"A">]>>,
  M.Tuple<[M.Const<"A">, M.Const<"B">]>
> = 1;
bothClosedSizesDontMatch1;

const bothClosedSizesDontMatch2: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">]>, M.Tuple<[M.Const<"A">, M.Const<"B">]>>,
  M.Tuple<[M.Const<"A">]>
> = 1;
bothClosedSizesDontMatch2;

const bothClosedMoreThan1FreeKey: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">, M.Enum<"A" | "B">]>,
    M.Tuple<[M.Const<"A">, M.Const<"B">]>
  >,
  M.Tuple<[M.Enum<"A" | "B">, M.Enum<"A" | "B">]>
> = 1;
bothClosedMoreThan1FreeKey;

const bothClosedImpossible1: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">]>, M.Tuple<[M.Const<"A">]>>,
  M.Never
> = 1;
bothClosedImpossible1;

const bothClosedImpossible2: A.Equals<
  M.Exclude<
    M.Tuple<[M.Const<"A">, M.Const<"B">]>,
    M.Tuple<[M.Const<"A">, M.Const<"B">]>
  >,
  M.Never
> = 1;
bothClosedImpossible2;

// Closed value open excluded
const closedValueOpenExcluded1: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">, M.Const<"B">]>,
    M.Tuple<[], true, M.Const<"B">>
  >,
  M.Tuple<[M.Enum<"A">, M.Const<"B">]>
> = 1;
closedValueOpenExcluded1;

const closedValueOpenExcluded2: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">]>, M.Tuple<[], true, M.Const<"C">>>,
  M.Tuple<[M.Const<"A">]>
> = 1;
closedValueOpenExcluded2;

// Open value closed excluded
const openValueClosedExcluded: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], true>, M.Tuple<[M.Const<"A">]>>,
  M.Tuple<[M.Const<"A">], true, M.Any>
> = 1;
openValueClosedExcluded;

// Both open
const bothOpenMatch1: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], true>, M.Tuple<[M.Const<"A">], true>>,
  M.Never
> = 1;
bothOpenMatch1;

const bothOpenMatch2: A.Equals<
  M.Exclude<
    M.Tuple<[M.Const<"A">], true, M.Const<"A">>,
    M.Tuple<[], true, M.Const<"A">>
  >,
  M.Never
> = 1;
bothOpenMatch2;

const bothOpenMoreThan1FreeKey1: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">], true, M.Enum<"A" | "B">>,
    M.Tuple<[], true, M.Const<"A">>
  >,
  M.Tuple<[M.Enum<"A" | "B">], true, M.Enum<"A" | "B">>
> = 1;
bothOpenMoreThan1FreeKey1;

const bothOpenMoreThan1FreeKey2: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], true>, M.Tuple<[], true, M.Const<"A">>>,
  M.Tuple<[M.Const<"A">], true>
> = 1;
bothOpenMoreThan1FreeKey2;

const bothOpenItemAdded: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">], true, M.Enum<"A" | "B">>,
    M.Tuple<[M.Enum<"A" | "B">, M.Const<"B">], true, M.Primitive<string>>
  >,
  M.Tuple<[M.Enum<"A" | "B">, M.Enum<"A">], true, M.Enum<"A" | "B">>
> = 1;
bothOpenItemAdded;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], true>, M.Object<{ a: M.Const<"A"> }, "a">>,
  M.Tuple<[M.Const<"A">], true>
> = 1;
objectsNeverExclude;

// --- UNION ---

const excludingUnion: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B" | "C">]>,
    M.Union<M.Const<["C"]> | M.Tuple<[M.Const<"B">]>>
  >,
  M.Tuple<[M.Enum<"A">]>
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">]>,
    M.Union<M.Const<["C"]> | M.Tuple<[M.Const<"D">]>>
  >,
  M.Tuple<[M.Enum<"A" | "B">]>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B" | "C">]>,
    M.Intersect<M.Const<["C"]>, M.Tuple<[M.Primitive<string>]>>
  >,
  M.Tuple<[M.Enum<"A" | "B">]>
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">]>,
    M.Intersect<M.Const<["D"]>, M.Tuple<[M.Primitive<string>]>>
  >,
  M.Tuple<[M.Enum<"A" | "B">]>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B" | "C">]>,
    M.Exclude<M.Tuple<[M.Enum<"A" | "B" | "C">]>, M.Const<["C"]>>
  >,
  M.Tuple<[M.Enum<"C">]>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B" | "C">]>,
    M.Exclude<
      M.Tuple<[M.Enum<"A" | "B" | "C">]>,
      M.Tuple<[M.Primitive<string>]>
    >
  >,
  M.Tuple<[M.Enum<"A" | "B" | "C">]>
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">, M.Const<"B">]>, M.Error<"Any">>,
  M.Error<"Any">
> = 1;
error;