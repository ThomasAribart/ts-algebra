import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const anyAlwaysIntersect: A.Equals<
  M.Intersect<M.Const<"foo">, M.Any>,
  M.Const<"foo">
> = 1;
anyAlwaysIntersect;

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  M.Intersect<M.Const<"foo">, M.Never>,
  M.Never
> = 1;
neverNeverIntersect;

// --- CONSTS ---

const intersectingConst: A.Equals<
  M.Intersect<M.Const<"foo">, M.Const<"foo">>,
  M.Const<"foo">
> = 1;
intersectingConst;

const nonIntersectingConst: A.Equals<
  M.Intersect<M.Const<"foo">, M.Const<"bar">>,
  M.Never
> = 1;
nonIntersectingConst;

// --- ENUM ---

const intersectingEnum: A.Equals<
  M.Intersect<M.Const<"foo">, M.Enum<"foo" | "bar" | "baz">>,
  M.Const<"foo">
> = 1;
intersectingEnum;

const nonIntersectingEnum: A.Equals<
  M.Intersect<M.Const<"foo">, M.Enum<"bar" | "baz">>,
  M.Never
> = 1;
nonIntersectingEnum;

// --- PRIMITIVES ---

const intersectingPrimitive: A.Equals<
  M.Intersect<M.Const<"foo">, M.Primitive<string>>,
  M.Const<"foo">
> = 1;
intersectingPrimitive;

const nonIntersectingPrimitive: A.Equals<
  M.Intersect<M.Const<"foo">, M.Primitive<boolean>>,
  M.Never
> = 1;
nonIntersectingPrimitive;

// --- ARRAY ---

const intersectingArray: A.Equals<
  M.Intersect<M.Const<["foo", "bar"]>, M.Array<M.Primitive<string>>>,
  M.Const<["foo", "bar"]>
> = 1;
intersectingArray;

const nonIntersectingArray: A.Equals<
  M.Intersect<M.Const<"foo">, M.Array<M.Primitive<string>>>,
  M.Never
> = 1;
nonIntersectingArray;

// --- TUPLE ---

const intersectingTuple1: A.Equals<
  M.Intersect<
    M.Const<["foo", "bar"]>,
    M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>
  >,
  M.Const<["foo", "bar"]>
> = 1;
intersectingTuple1;

const intersectingTuple2: A.Equals<
  M.Intersect<
    M.Const<["foo", 42, "bar"]>,
    M.Tuple<
      [M.Primitive<string>, M.Primitive<number>],
      true,
      M.Primitive<string>
    >
  >,
  M.Const<["foo", 42, "bar"]>
> = 1;
intersectingTuple2;

const nonIntersectingTuple1: A.Equals<
  M.Intersect<
    M.Const<["foo", 42]>,
    M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>
  >,
  M.Never
> = 1;
nonIntersectingTuple1;

const nonIntersectingTuple2: A.Equals<
  M.Intersect<
    M.Const<"foo">,
    M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>
  >,
  M.Never
> = 1;
nonIntersectingTuple2;

// --- OBJECT ---

const intersectingObject: A.Equals<
  M.Intersect<
    M.Const<{ foo: "bar" }>,
    M.Object<{ foo: M.Primitive<string> }, "foo", true, M.Primitive<string>>
  >,
  M.Const<{ foo: "bar" }>
> = 1;
intersectingObject;

const nonIntersectingObject: A.Equals<
  M.Intersect<
    M.Const<"foo">,
    M.Object<{ foo: M.Primitive<string> }, "foo", true, M.Primitive<string>>
  >,
  M.Never
> = 1;
nonIntersectingObject;

// --- UNION ---

const intersectingUnion1: A.Equals<
  M.Intersect<
    M.Const<"foo">,
    M.Union<M.Primitive<string> | M.Primitive<number>>
  >,
  M.Union<M.Const<"foo"> | M.Never>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  M.Intersect<M.Const<"foo">, M.Union<M.Const<"foo"> | M.Primitive<number>>>,
  M.Union<M.Const<"foo"> | M.Never>
> = 1;
intersectingUnion2;

const nonIntersectingUnion: A.Equals<
  M.Intersect<
    M.Const<"foo">,
    M.Union<M.Primitive<number> | M.Array<M.Primitive<string>>>
  >,
  M.Union<M.Never>
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const intersectingIntersection: A.Equals<
  M.Intersect<M.Const<"foo">, M.Intersect<M.Const<"foo">, M.Primitive<string>>>,
  M.Const<"foo">
> = 1;
intersectingIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  M.Intersect<M.Const<"foo">, M.Exclude<M.Primitive<string>, M.Const<"bar">>>,
  M.Const<"foo">
> = 1;
intersectingExclusion;
