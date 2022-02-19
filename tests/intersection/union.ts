import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const anysAlwaysIntersect: A.Equals<
  M.Intersect<M.Union<M.Const<"foo"> | M.Primitive<number>>, M.Any>,
  M.Union<M.Const<"foo"> | M.Primitive<number>>
> = 1;
anysAlwaysIntersect;

// --- NEVER ---

const neversNeverIntersect: A.Equals<
  M.Intersect<M.Union<M.Const<"foo"> | M.Primitive<number>>, M.Never>,
  M.Never
> = 1;
neversNeverIntersect;

// --- CONSTS ---

const intersectingConst1: A.Equals<
  M.Intersect<M.Union<M.Const<"foo"> | M.Primitive<number>>, M.Const<"foo">>,
  M.Union<M.Const<"foo"> | M.Never>
> = 1;
intersectingConst1;

const intersectingConst2: A.Equals<
  M.Intersect<M.Union<M.Const<"foo"> | M.Primitive<number>>, M.Const<422>>,
  M.Union<M.Const<422> | M.Never>
> = 1;
intersectingConst2;

const nonIntersectingConst: A.Equals<
  M.Intersect<M.Union<M.Const<"foo"> | M.Primitive<number>>, M.Const<true>>,
  M.Union<M.Never>
> = 1;
nonIntersectingConst;

// --- ENUM ---

const intersectingEnum: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<number>>,
    M.Enum<"foo" | 42>
  >,
  M.Union<M.Const<"foo"> | M.Enum<42>>
> = 1;
intersectingEnum;

const nonIntersectingEnum: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<number>>,
    M.Enum<["bar", true]>
  >,
  M.Union<M.Never | M.Enum<never>>
> = 1;
nonIntersectingEnum;

// --- PRIMITIVES ---

const intersectingPrimitive1: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<number>>,
    M.Primitive<string>
  >,
  M.Union<M.Const<"foo"> | M.Never>
> = 1;
intersectingPrimitive1;

const intersectingPrimitive2: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<number>>,
    M.Primitive<number>
  >,
  M.Union<M.Primitive<number> | M.Never>
> = 1;
intersectingPrimitive2;

const nonIntersectingPrimitive: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<number>>,
    M.Primitive<boolean>
  >,
  M.Union<M.Never>
> = 1;
nonIntersectingPrimitive;

// --- ARRAY ---

const nonIntersectingArray: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<number>>,
    M.Array<M.Primitive<string>>
  >,
  M.Union<M.Never>
> = 1;
nonIntersectingArray;

// --- TUPLE ---

const nonIntersectingTuple: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<number>>,
    M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>
  >,
  M.Union<M.Never>
> = 1;
nonIntersectingTuple;

// --- OBJECT ---

const nonIntersectingObject: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<number>>,
    M.Object<{ foo: M.Primitive<string> }, "foo", true, M.Primitive<string>>
  >,
  M.Union<M.Never>
> = 1;
nonIntersectingObject;

// --- UNION ---

const intersectingUnion1: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<number>>,
    M.Union<M.Primitive<string>>
  >,
  M.Union<M.Union<M.Never> | M.Union<M.Const<"foo">>>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<number>>,
    M.Union<M.Const<"foo"> | M.Primitive<boolean>>
  >,
  M.Union<M.Union<M.Const<"foo"> | M.Never> | M.Union<M.Never>>
> = 1;
intersectingUnion2;

const intersectingUnion3: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<number>>,
    M.Union<M.Const<"bar"> | M.Primitive<number>>
  >,
  M.Union<M.Union<M.Never> | M.Union<M.Primitive<number> | M.Never>>
> = 1;
intersectingUnion3;

const nonIntersectingUnion: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<number>>,
    M.Union<M.Array<M.Primitive<boolean>>>
  >,
  M.Union<M.Union<M.Never>>
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const intersectingIntersection: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<number>>,
    M.Intersect<M.Primitive<string>, M.Enum<"foo" | 42>>
  >,
  M.Union<M.Const<"foo"> | M.Never>
> = 1;
intersectingIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  M.Intersect<
    M.Union<M.Const<"foo"> | M.Primitive<boolean>>,
    M.Exclude<M.Enum<42 | true | "foo" | "bar">, M.Primitive<number>>
  >,
  M.Union<M.Const<"foo"> | M.Enum<true>>
> = 1;
intersectingExclusion;

// --- ERROR ---

const error: A.Equals<
  M.Intersect<M.Union<M.Const<"foo"> | M.Primitive<number>>, M.Error<"Any">>,
  M.Error<"Any">
> = 1;
error;
