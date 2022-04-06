import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const anyToAny: A.Equals<M.Intersect<M.Any, M.Any>, M.Any> = 1;
anyToAny;

// --- NEVER ---

const anyToNever: A.Equals<M.Intersect<M.Any, M.Never>, M.Never> = 1;
anyToNever;

// --- CONSTS ---

const anyToConst: A.Equals<
  M.Intersect<M.Any, M.Const<"foo">>,
  M.Const<"foo">
> = 1;
anyToConst;

// --- ENUM ---

const anyToEnum: A.Equals<
  M.Intersect<M.Any, M.Enum<"foo" | "bar" | 42>>,
  M.Enum<"foo" | "bar" | 42>
> = 1;
anyToEnum;

// --- PRIMITIVES ---

const anyToPrimitive: A.Equals<
  M.Intersect<M.Any, M.Primitive<string>>,
  M.Primitive<string>
> = 1;
anyToPrimitive;

// --- ARRAY ---

const anyToArray: A.Equals<
  M.Intersect<M.Any, M.Array<M.Primitive<string>>>,
  M.Array<M.Primitive<string>>
> = 1;
anyToArray;

// --- TUPLE ---

const anyToTuple: A.Equals<
  M.Intersect<M.Any, M.Tuple<[M.Primitive<string>], M.Any>>,
  M.Tuple<[M.Primitive<string>], M.Any>
> = 1;
anyToTuple;

// --- OBJECT ---

const anyToObject: A.Equals<M.Intersect<M.Any, M.Object>, M.Object> = 1;
anyToObject;

// --- UNION ---

const anyToUnion: A.Equals<
  M.Intersect<M.Any, M.Union<M.Const<"foo"> | M.Array<M.Primitive<number>>>>,
  M.Union<M.Const<"foo"> | M.Array<M.Primitive<number>>>
> = 1;
anyToUnion;

// --- INTERSECTION ---

const anyToIntersection: A.Equals<
  M.Intersect<M.Any, M.Intersect<M.Enum<"A" | "B">, M.Const<"A">>>,
  M.Const<"A">
> = 1;
anyToIntersection;

// --- EXCLUSION ---

const anyToExclusion: A.Equals<
  M.Intersect<M.Any, M.Exclude<M.Enum<"A" | "B">, M.Const<"A">>>,
  M.Enum<"B">
> = 1;
anyToExclusion;
