import { A } from "ts-toolbelt";

import { M } from "index";

// --- NEVER ---

const neversNeverExclude: A.Equals<
  M.Exclude<M.Array<M.Primitive<string>>, M.Never>,
  M.Array<M.Primitive<string>>
> = 1;
neversNeverExclude;

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  M.Exclude<M.Array<M.Primitive<string>>, M.Any>,
  M.Never
> = 1;
anysAlwaysExclude;

// --- CONSTS ---

const constsNeverExclude: A.Equals<
  M.Exclude<M.Array<M.Primitive<string>>, M.Const<["foo", "bar"]>>,
  M.Array<M.Primitive<string>>
> = 1;
constsNeverExclude;

// --- ENUM ---

const enumsNeverExclude: A.Equals<
  M.Exclude<M.Array<M.Primitive<string>>, M.Enum<["foo"] | ["bar"] | 42>>,
  M.Array<M.Primitive<string>>
> = 1;
enumsNeverExclude;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  M.Exclude<M.Array<M.Primitive<string>>, M.Primitive<string>>,
  M.Array<M.Primitive<string>>
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const excludingArray: A.Equals<
  M.Exclude<M.Array<M.Primitive<string>>, M.Array<M.Primitive<string>>>,
  M.Never
> = 1;
excludingArray;

const nonExcludingArray1: A.Equals<
  M.Exclude<M.Array<M.Primitive<string>>, M.Array<M.Primitive<number>>>,
  M.Array<M.Primitive<string>>
> = 1;
nonExcludingArray1;

const nonExcludingArray2: A.Equals<
  M.Exclude<
    M.Array<M.Union<M.Primitive<string> | M.Primitive<number>>>,
    M.Array<M.Primitive<number>>
  >,
  M.Array<M.Union<M.Primitive<string> | M.Primitive<number>>>
> = 1;
nonExcludingArray2;

// --- TUPLE ---

const excludingTuple: A.Equals<
  M.Exclude<M.Array<M.Primitive<string>>, M.Tuple<[], M.Primitive<string>>>,
  M.Never
> = 1;
excludingTuple;

const nonExcludingTuple1: A.Equals<
  M.Exclude<
    M.Array<M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>], M.Any>
  >,
  M.Array<M.Primitive<string>>
> = 1;
nonExcludingTuple1;

const nonExcludingTuple2: A.Equals<
  M.Exclude<
    M.Array<M.Union<M.Primitive<string> | M.Primitive<number>>>,
    M.Tuple<[], M.Primitive<number>>
  >,
  M.Array<M.Union<M.Primitive<string> | M.Primitive<number>>>
> = 1;
nonExcludingTuple2;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<
  M.Exclude<
    M.Array<M.Primitive<string>>,
    M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>
  >,
  M.Array<M.Primitive<string>>
> = 1;
objectsNeverExclude;

// --- UNION ---

const excludingUnion: A.Equals<
  M.Exclude<
    M.Array<M.Primitive<string>>,
    M.Union<M.Array<M.Primitive<string>> | M.Array<M.Primitive<number>>>
  >,
  M.Never
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  M.Exclude<
    M.Array<M.Primitive<string>>,
    M.Union<M.Const<["foo"]> | M.Array<M.Primitive<number>>>
  >,
  M.Array<M.Primitive<string>>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  M.Exclude<
    M.Array<M.Primitive<string>>,
    M.Intersect<
      M.Array<M.Primitive<string>>,
      M.Array<M.Union<M.Primitive<string> | M.Primitive<number>>>
    >
  >,
  M.Never
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  M.Exclude<
    M.Array<M.Primitive<string>>,
    M.Intersect<M.Array<M.Primitive<string>>, M.Array<M.Const<"A">>>
  >,
  M.Array<M.Primitive<string>>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  M.Exclude<
    M.Array<M.Const<"foo">>,
    M.Exclude<M.Array<M.Primitive<string>>, M.Const<[]>>
  >,
  M.Never
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  M.Exclude<
    M.Array<M.Primitive<string>>,
    M.Exclude<M.Array<M.Primitive<number>>, M.Array<M.Const<42>>>
  >,
  M.Array<M.Primitive<string>>
> = 1;
nonExcludingExclusion;
