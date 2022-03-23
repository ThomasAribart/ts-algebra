import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const neverToAny: A.Equals<M.Intersect<M.Never, M.Any>, M.Never> = 1;
neverToAny;

// --- NEVER ---

const neverToNever: A.Equals<M.Intersect<M.Never, M.Never>, M.Never> = 1;
neverToNever;

// --- CONSTS ---

const neverToConst: A.Equals<M.Intersect<M.Never, M.Const<"foo">>, M.Never> = 1;
neverToConst;

// --- ENUM ---

const neverToEnum: A.Equals<
  M.Intersect<M.Never, M.Enum<"foo" | "bar" | 42>>,
  M.Never
> = 1;
neverToEnum;

// --- PRIMITIVES ---

const neverToPrimitive: A.Equals<
  M.Intersect<M.Never, M.Primitive<string>>,
  M.Never
> = 1;
neverToPrimitive;

// --- ARRAY ---

const neverToArray: A.Equals<
  M.Intersect<M.Never, M.Array<M.Primitive<string>>>,
  M.Never
> = 1;
neverToArray;

// --- TUPLE ---

const neverToTuple: A.Equals<
  M.Intersect<M.Never, M.Tuple<[M.Primitive<string>], true>>,
  M.Never
> = 1;
neverToTuple;

// --- OBJECT ---

const neverToObject: A.Equals<M.Intersect<M.Never, M.Object>, M.Never> = 1;
neverToObject;

// --- UNION ---

const neverToUnion: A.Equals<
  M.Intersect<M.Never, M.Union<M.Any | M.Array<M.Primitive<number>>>>,
  M.Never
> = 1;
neverToUnion;

// --- INTERSECTION ---

const neverToIntersection: A.Equals<
  M.Intersect<M.Never, M.Intersect<M.Any, M.Any>>,
  M.Never
> = 1;
neverToIntersection;

// --- EXCLUSION ---

const neverToExclusion: A.Equals<
  M.Intersect<M.Never, M.Exclude<M.Any, M.Const<"A">>>,
  M.Never
> = 1;
neverToExclusion;
