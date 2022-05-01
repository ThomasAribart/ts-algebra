import { A } from "ts-toolbelt";

import { M } from "index";

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  M.Intersect<M.Exclude<M.Primitive<string>, M.Const<"bar">>, M.Never>,
  M.Never
> = 1;
neverNeverIntersect;

// --- ANY ---

const anyAlwaysIntersect: A.Equals<
  M.Intersect<M.Exclude<M.Primitive<string>, M.Const<"bar">>, M.Any>,
  M.Primitive<string>
> = 1;
anyAlwaysIntersect;

// --- CONSTS ---

const intersectingConst: A.Equals<
  M.Intersect<M.Exclude<M.Primitive<string>, M.Const<"bar">>, M.Const<"foo">>,
  M.Const<"foo">
> = 1;
intersectingConst;

// --- ENUM ---

const intersectingEnum: A.Equals<
  M.Intersect<
    M.Exclude<M.Primitive<string>, M.Enum<"foo" | "bar">>,
    M.Enum<"foo" | "bar" | "baz" | 42>
  >,
  // Cannot do better, now that we resolve exclusions right away
  M.Enum<"foo" | "bar" | "baz">
> = 1;
intersectingEnum;

// --- PRIMITIVES ---

const intersectingPrimitive: A.Equals<
  M.Intersect<
    M.Exclude<M.Enum<"foo" | 42 | true>, M.Primitive<number>>,
    M.Primitive<string>
  >,
  M.Enum<"foo">
> = 1;
intersectingPrimitive;

const nonIntersectingPrimitive: A.Equals<
  M.Intersect<M.Exclude<M.Primitive<number>, M.Const<42>>, M.Primitive<number>>,
  M.Primitive<number>
> = 1;
nonIntersectingPrimitive;

// --- ARRAY ---

const intersectingArray: A.Equals<
  M.Intersect<
    M.Exclude<M.Array<M.Primitive<string>>, M.Const<[]>>,
    M.Array<M.Const<"foo">>
  >,
  M.Array<M.Const<"foo">>
> = 1;
intersectingArray;

// --- TUPLE ---

const intersectingTuple: A.Equals<
  M.Intersect<
    M.Exclude<M.Tuple<[M.Primitive<string>], M.Any>, M.Const<[]>>,
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>], M.Primitive<string>>
> = 1;
intersectingTuple;

// --- OBJECT ---

const intersectingObject: A.Equals<
  M.Intersect<
    M.Exclude<
      M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>,
      M.Const<{ foo: "bar" }>
    >,
    M.Object<{ baz: M.Primitive<string> }, "baz", M.Any>
  >,
  M.Object<
    { foo: M.Primitive<string>; baz: M.Primitive<string> },
    "foo" | "baz",
    M.Primitive<string>
  >
> = 1;
intersectingObject;

// --- UNION ---

const intersectingUnion: A.Equals<
  M.Intersect<
    M.Exclude<M.Enum<42 | true | "foo" | "bar">, M.Primitive<number>>,
    M.Union<M.Const<"foo"> | M.Primitive<boolean>>
  >,
  M.Union<M.Const<"foo"> | M.Enum<true>>
> = 1;
intersectingUnion;

// --- INTERSECTION ---

const intersectingIntersection: A.Equals<
  M.Intersect<
    M.Exclude<M.Primitive<string>, M.Const<"foo">>,
    M.Intersect<M.Primitive<string>, M.Enum<"foo" | "bar">>
  >,
  // Cannot do better, now that we resolve exclusions right away
  M.Enum<"foo" | "bar">
> = 1;
intersectingIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  M.Intersect<
    M.Exclude<
      M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
      M.Const<"A">
    >,
    M.Exclude<M.Enum<"B" | "C">, M.Const<"B">>
  >,
  M.Union<M.Never | M.Const<"C">>
> = 1;
intersectingExclusion;
