import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const anyAlwaysIntersect: A.Equals<
  M.Intersect<M.Primitive<string>, M.Any>,
  M.Primitive<string>
> = 1;
anyAlwaysIntersect;

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  M.Intersect<M.Primitive<string>, M.Never>,
  M.Never
> = 1;
neverNeverIntersect;

// --- CONSTS ---

const intersectingConst: A.Equals<
  M.Intersect<M.Primitive<string>, M.Const<"foo">>,
  M.Const<"foo">
> = 1;
intersectingConst;

const nonIntersectingConst: A.Equals<
  M.Intersect<M.Primitive<string>, M.Const<42>>,
  M.Never
> = 1;
nonIntersectingConst;

// --- ENUM ---

const intersectingEnum1: A.Equals<
  M.Intersect<M.Primitive<string>, M.Enum<"foo" | "bar" | 42>>,
  M.Enum<"foo" | "bar">
> = 1;
intersectingEnum1;

const intersectingEnum2: A.Equals<
  M.Intersect<M.Primitive<number>, M.Enum<"bar" | "baz" | 42>>,
  M.Enum<42>
> = 1;
intersectingEnum2;

const nonIntersectingEnum: A.Equals<
  M.Intersect<M.Primitive<number>, M.Enum<"bar" | "baz">>,
  M.Enum<never>
> = 1;
nonIntersectingEnum;

// --- PRIMITIVES ---

const intersectingPrimitive: A.Equals<
  M.Intersect<M.Primitive<string>, M.Primitive<string>>,
  M.Primitive<string>
> = 1;
intersectingPrimitive;

const nonIntersectingPrimitive: A.Equals<
  M.Intersect<M.Primitive<string>, M.Primitive<boolean>>,
  M.Never
> = 1;
nonIntersectingPrimitive;

// --- ARRAY ---

const arraysNeverIntersect: A.Equals<
  M.Intersect<M.Primitive<string>, M.Array<M.Primitive<string>>>,
  M.Never
> = 1;
arraysNeverIntersect;

// --- TUPLE ---

const tuplesNeverIntersect: A.Equals<
  M.Intersect<
    M.Primitive<string>,
    M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>
  >,
  M.Never
> = 1;
tuplesNeverIntersect;

// --- OBJECT ---

const objectsNeverIntersect: A.Equals<
  M.Intersect<
    M.Primitive<string>,
    M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>
  >,
  M.Never
> = 1;
objectsNeverIntersect;

// --- UNION ---

const intersectingUnion1: A.Equals<
  M.Intersect<
    M.Primitive<string>,
    M.Union<M.Primitive<string> | M.Primitive<number>>
  >,
  M.Union<M.Primitive<string> | M.Never>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  M.Intersect<
    M.Primitive<string>,
    M.Union<M.Const<"foo"> | M.Primitive<number>>
  >,
  M.Union<M.Const<"foo"> | M.Never>
> = 1;
intersectingUnion2;

const nonIntersectingUnion: A.Equals<
  M.Intersect<
    M.Primitive<string>,
    M.Union<M.Primitive<number> | M.Array<M.Primitive<string>>>
  >,
  M.Union<M.Never>
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const intersectingIntersection: A.Equals<
  M.Intersect<
    M.Const<"foo">,
    M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Primitive<string>>
  >,
  M.Const<"foo">
> = 1;
intersectingIntersection;

// --- EXCLUSION ---

const intersectingExclusion1: A.Equals<
  M.Intersect<
    M.Primitive<string>,
    M.Exclude<M.Enum<"foo" | 42 | true>, M.Primitive<number>>
  >,
  M.Enum<"foo">
> = 1;
intersectingExclusion1;

const intersectingExclusion2: A.Equals<
  M.Intersect<M.Primitive<number>, M.Exclude<M.Primitive<number>, M.Const<42>>>,
  M.Primitive<number>
> = 1;
intersectingExclusion2;
