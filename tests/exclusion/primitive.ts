import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  M.Exclude<M.Primitive<string>, M.Any>,
  M.Never
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  M.Exclude<M.Primitive<string>, M.Never>,
  M.Primitive<string>
> = 1;
neversNeverExclude;

// --- CONSTS ---

const constsNeverExclude: A.Equals<
  M.Exclude<M.Primitive<string>, M.Const<"A">>,
  M.Primitive<string>
> = 1;
constsNeverExclude;

// --- ENUM ---

const enumsNeverExclude: A.Equals<
  M.Exclude<M.Primitive<string>, M.Enum<"A" | "B">>,
  M.Primitive<string>
> = 1;
enumsNeverExclude;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  M.Exclude<M.Primitive<string>, M.Primitive<string>>,
  M.Never
> = 1;
excludingPrimitive;

const nonExcludingPrimitive: A.Equals<
  M.Exclude<M.Primitive<string>, M.Primitive<number>>,
  M.Primitive<string>
> = 1;
nonExcludingPrimitive;

// --- ARRAY ---

const arraysNeverExclude: A.Equals<
  M.Exclude<M.Primitive<string>, M.Array<M.Primitive<string>>>,
  M.Primitive<string>
> = 1;
arraysNeverExclude;

// --- TUPLE ---

const tuplesNeverExclude: A.Equals<
  M.Exclude<M.Primitive<string>, M.Tuple<[], M.Primitive<string>>>,
  M.Primitive<string>
> = 1;
tuplesNeverExclude;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<
  M.Exclude<M.Primitive<string>, M.Object>,
  M.Primitive<string>
> = 1;
objectsNeverExclude;

// --- UNION ---

const excludingUnion: A.Equals<
  M.Exclude<
    M.Primitive<string>,
    M.Union<M.Primitive<string> | M.Primitive<number>>
  >,
  M.Never
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  M.Exclude<M.Primitive<string>, M.Union<M.Const<"C"> | M.Primitive<number>>>,
  M.Primitive<string>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  M.Exclude<
    M.Primitive<string>,
    M.Intersect<
      M.Union<M.Primitive<string> | M.Primitive<number>>,
      M.Primitive<string>
    >
  >,
  M.Never
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  M.Exclude<M.Primitive<string>, M.Union<M.Const<"C"> | M.Primitive<number>>>,
  M.Primitive<string>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  M.Exclude<M.Primitive<string>, M.Exclude<M.Primitive<string>, M.Const<"B">>>,
  M.Never
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  M.Exclude<
    M.Primitive<string>,
    M.Exclude<
      M.Union<M.Primitive<string> | M.Primitive<number>>,
      M.Primitive<string>
    >
  >,
  M.Primitive<string>
> = 1;
nonExcludingExclusion;
