import { A } from "ts-toolbelt";

import { M } from "index";

// --- ANY ---

const anyAlwaysIntersect: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar">, M.Any>,
  M.Enum<"foo" | "bar">
> = 1;
anyAlwaysIntersect;

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar">, M.Never>,
  M.Never
> = 1;
neverNeverIntersect;

// --- CONSTS ---

const intersectingConst: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Const<"foo">>,
  M.Const<"foo">
> = 1;
intersectingConst;

const nonIntersectingConst: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Const<true>>,
  M.Never
> = 1;
nonIntersectingConst;

// --- ENUM ---

const intersectingEnum: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Enum<"foo" | 42>>,
  M.Enum<"foo" | 42>
> = 1;
intersectingEnum;

const nonIntersectingEnum: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Enum<43 | true>>,
  M.Enum<never>
> = 1;
nonIntersectingEnum;

// --- PRIMITIVES ---

const intersectingPrimitive1: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Primitive<string>>,
  M.Enum<"foo" | "bar">
> = 1;
intersectingPrimitive1;

enum Food {
  Pizza = "pizza",
  Tacos = "tacos",
  Fries = "fries",
}

const intersectingPrimitive2: A.Equals<
  M.Intersect<M.Enum<Food>, M.Primitive<string>>,
  M.Enum<Food>
> = 1;
intersectingPrimitive2;

const nonIntersectingPrimitive: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Primitive<boolean>>,
  M.Enum<never>
> = 1;
nonIntersectingPrimitive;

// --- ARRAY ---

const intersectingArray: A.Equals<
  M.Intersect<M.Enum<["foo", "bar"] | [42]>, M.Array<M.Primitive<string>>>,
  M.Enum<["foo", "bar"]>
> = 1;
intersectingArray;

const nonIntersectingArray: A.Equals<
  M.Intersect<M.Enum<"foo" | 42>, M.Array<M.Primitive<string>>>,
  M.Enum<never>
> = 1;
nonIntersectingArray;

// --- TUPLE ---

const intersectingTuple: A.Equals<
  M.Intersect<
    M.Enum<["foo", "bar"] | ["foo", 42]>,
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>
  >,
  M.Enum<["foo", "bar"]>
> = 1;
intersectingTuple;

const nonIntersectingTuple: A.Equals<
  M.Intersect<
    M.Enum<"foo" | "bar" | 42>,
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>
  >,
  M.Enum<never>
> = 1;
nonIntersectingTuple;

// --- OBJECT ---

const intersectingObject: A.Equals<
  M.Intersect<
    M.Enum<{ foo: "str"; bar: "str" } | { foo: "str"; bar: 42 }>,
    M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>
  >,
  M.Enum<{ foo: "str"; bar: "str" }>
> = 1;
intersectingObject;

const nonIntersectingObject: A.Equals<
  M.Intersect<
    M.Enum<"foo" | "bar" | 42>,
    M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>
  >,
  M.Enum<never>
> = 1;
nonIntersectingObject;

// --- UNION ---

const intersectingUnion1: A.Equals<
  M.Intersect<M.Enum<"foo" | "bar" | 42>, M.Union<M.Primitive<string>>>,
  M.Union<M.Enum<"foo" | "bar">>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  M.Intersect<
    M.Enum<"foo" | "bar" | 42>,
    M.Union<M.Const<"foo"> | M.Primitive<boolean>>
  >,
  M.Union<M.Const<"foo"> | M.Enum<never>>
> = 1;
intersectingUnion2;

const nonIntersectingUnion: A.Equals<
  M.Intersect<
    M.Enum<"foo" | "bar" | 42>,
    M.Union<M.Object | M.Primitive<boolean>>
  >,
  M.Union<M.Enum<never>>
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const intersectingIntersection: A.Equals<
  M.Intersect<
    M.Enum<"foo" | "bar" | 42>,
    M.Intersect<M.Primitive<string>, M.Const<"foo">>
  >,
  M.Const<"foo">
> = 1;
intersectingIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  M.Intersect<
    M.Enum<"foo" | "bar" | "baz" | 42>,
    M.Exclude<M.Primitive<string>, M.Enum<"foo" | "bar">>
  >,
  // Cannot do better, now that we resolve exclusions right away
  M.Enum<"foo" | "bar" | "baz">
> = 1;
intersectingExclusion;
