import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const anNeverExclude: A.Equals<M.Exclude<M.Never, M.Any>, M.Never> = 1;
anNeverExclude;

// --- NEVER ---

const neveNeverExclude: A.Equals<M.Exclude<M.Never, M.Never>, M.Never> = 1;
neveNeverExclude;

// --- CONSTS ---

const constsNeverExclude: A.Equals<
  M.Exclude<M.Never, M.Const<"foo">>,
  M.Never
> = 1;
constsNeverExclude;

// --- ENUM ---

const enumsNeverExclude: A.Equals<
  M.Exclude<M.Never, M.Enum<"foo" | "bar" | 42>>,
  M.Never
> = 1;
enumsNeverExclude;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  M.Exclude<M.Never, M.Primitive<string>>,
  M.Never
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const arraysNeverExclude: A.Equals<
  M.Exclude<M.Never, M.Array<M.Primitive<string>>>,
  M.Never
> = 1;
arraysNeverExclude;

// --- TUPLE ---

const tuplesNeverExclude: A.Equals<
  M.Exclude<M.Never, M.Tuple<[M.Primitive<string>], true>>,
  M.Never
> = 1;
tuplesNeverExclude;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<M.Exclude<M.Never, M.Object>, M.Never> = 1;
objectsNeverExclude;

// --- UNION ---

const unionsNeverExclude: A.Equals<
  M.Exclude<M.Never, M.Union<M.Any | M.Array<M.Primitive<number>>>>,
  M.Never
> = 1;
unionsNeverExclude;

// --- INTERSECTION ---

const intersectionsNeverExclude: A.Equals<
  M.Exclude<M.Never, M.Intersect<M.Any, M.Any>>,
  M.Never
> = 1;
intersectionsNeverExclude;

// --- EXCLUSION ---

const exclusionsNeverExclude: A.Equals<
  M.Exclude<M.Never, M.Exclude<M.Any, M.Const<"A">>>,
  M.Never
> = 1;
exclusionsNeverExclude;
