import type { A } from "ts-toolbelt";

import type { M } from "~/index";

// --- NEVER ---

const neverNeverIntersects: A.Equals<
  M.Intersect<M.Array<M.Primitive<string>>, M.Never>,
  M.Never
> = 1;
neverNeverIntersects;

// --- ANY ---

const anyAlwaysIntersects: A.Equals<
  M.Intersect<M.Array<M.Primitive<string>>, M.Any>,
  M.Array<M.Primitive<string>>
> = 1;
anyAlwaysIntersects;

const arrayToSerializedAny: A.Equals<
  M.Intersect<M.Array<M.Primitive<string>>, M.Any<true, Date[]>>,
  M.Array<M.Primitive<string>, true, Date[]>
> = 1;
arrayToSerializedAny;

const serializedArrayToAny: A.Equals<
  M.Intersect<M.Array<M.Primitive<string>, true, Date[]>, M.Any>,
  M.Array<M.Primitive<string>, true, Date[]>
> = 1;
serializedArrayToAny;

const serializedArrayToSerializedAny: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>, true, Date[]>,
    M.Any<true, unknown[]>
  >,
  M.Array<M.Primitive<string>, true, Date[] & unknown[]>
> = 1;
serializedArrayToSerializedAny;

// --- CONSTS ---

const intersectingConst: A.Equals<
  M.Intersect<M.Array<M.Primitive<string>>, M.Const<["foo", "bar"]>>,
  M.Const<["foo", "bar"]>
> = 1;
intersectingConst;

const test1b: A.Equals<
  M.Intersect<M.Array<M.Primitive<string>>, M.Const<["foo", 42]>>,
  M.Never
> = 1;
test1b;

// --- ENUM ---

const intersectingEnum1: A.Equals<
  M.Intersect<M.Array<M.Primitive<string>>, M.Enum<["foo"] | ["bar"] | 42>>,
  M.Enum<["foo"] | ["bar"]>
> = 1;
intersectingEnum1;

const intersectingEnum2: A.Equals<
  M.Intersect<M.Array<M.Primitive<number>>, M.Enum<["bar", "baz"] | [42]>>,
  M.Enum<[42]>
> = 1;
intersectingEnum2;

const nonIntersectingEnum: A.Equals<
  M.Intersect<M.Array<M.Primitive<number>>, M.Enum<["bar", "baz"]>>,
  M.Enum<never>
> = 1;
nonIntersectingEnum;

// --- PRIMITIVES ---

const primitivesNeverIntersect: A.Equals<
  M.Intersect<M.Array<M.Primitive<string>>, M.Primitive<string>>,
  M.Never
> = 1;
primitivesNeverIntersect;

// --- ARRAY ---

const intersectingArray: A.Equals<
  M.Intersect<M.Array<M.Primitive<string>>, M.Array<M.Primitive<string>>>,
  M.Array<M.Primitive<string>>
> = 1;
intersectingArray;

const nonIntersectingArray: A.Equals<
  M.Intersect<M.Array<M.Primitive<string>>, M.Array<M.Primitive<number>>>,
  M.Array<M.Never>
> = 1;
nonIntersectingArray;

const arrayToSerializedArray: A.Equals<
  M.Intersect<M.Array<M.Primitive<string>>, M.Array<M.Any, true, Date[]>>,
  M.Array<M.Primitive<string>, true, Date[]>
> = 1;
arrayToSerializedArray;

const serializedArrayToArray: A.Equals<
  M.Intersect<M.Array<M.Primitive<string>, true, Date[]>, M.Array>,
  M.Array<M.Primitive<string>, true, Date[]>
> = 1;
serializedArrayToArray;

const serializedArrayToSerializedArray: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>, true, Date[]>,
    M.Array<M.Any, true, unknown[]>
  >,
  M.Array<M.Primitive<string>, true, Date[] & unknown[]>
> = 1;
serializedArrayToSerializedArray;

// --- TUPLE ---

const intersectingTuple1: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>], M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>], M.Primitive<string>>
> = 1;
intersectingTuple1;

const intersectingTuple2: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>], M.Const<"foo">>
  >,
  M.Tuple<[M.Primitive<string>], M.Const<"foo">>
> = 1;
intersectingTuple2;

const tupleOpenPropsBecomeString: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>], M.Any>
  >,
  M.Tuple<[M.Primitive<string>], M.Primitive<string>>
> = 1;
tupleOpenPropsBecomeString;

const tupleOpenPropsBecomeFoo: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>], M.Enum<"foo" | 42>>
  >,
  M.Tuple<[M.Primitive<string>], M.Enum<"foo">>
> = 1;
tupleOpenPropsBecomeFoo;

const tupleBecomeClose: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>], M.Primitive<number>>
  >,
  M.Tuple<[M.Primitive<string>]>
> = 1;
tupleBecomeClose;

const nonIntersectingTuple: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>, M.Primitive<boolean>], M.Primitive<string>>
  >,
  M.Never
> = 1;
nonIntersectingTuple;

const arrayToSerializedTuple: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>
  >,
  M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>
> = 1;
arrayToSerializedTuple;

const serializedArrayToTuple: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>, true, Date[]>,
    M.Tuple<[M.Primitive<string>]>
  >,
  M.Tuple<[M.Primitive<string>], M.Never, true, Date[]>
> = 1;
serializedArrayToTuple;

const serializedArrayToSerializedTuple: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>, true, Date[]>,
    M.Tuple<[M.Primitive<string>], M.Never, true, [Date]>
  >,
  M.Tuple<[M.Primitive<string>], M.Never, true, Date[] & [Date]>
> = 1;
serializedArrayToSerializedTuple;

// --- OBJECT ---

const objectsNeverIntersect: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>>,
    M.Object<{ foo: M.Primitive<string> }, "foo", M.Primitive<string>>
  >,
  M.Never
> = 1;
objectsNeverIntersect;

// --- UNION ---

const numberIsSubstracted1: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>>,
    M.Union<M.Array<M.Primitive<string>> | M.Array<M.Primitive<number>>>
  >,
  M.Union<M.Array<M.Primitive<string>> | M.Array<M.Never>>
> = 1;
numberIsSubstracted1;

const numberIsSubstracted2: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>>,
    M.Union<M.Const<["foo"]> | M.Array<M.Primitive<number>>>
  >,
  M.Union<M.Const<["foo"]> | M.Array<M.Never>>
> = 1;
numberIsSubstracted2;

const tupleIsKept: A.Equals<
  M.Intersect<
    M.Array<M.Primitive<string>>,
    M.Union<
      M.Array<M.Primitive<number>> | M.Tuple<[M.Primitive<string>], M.Any>
    >
  >,
  M.Union<
    M.Array<M.Never> | M.Tuple<[M.Primitive<string>], M.Primitive<string>>
  >
> = 1;
tupleIsKept;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  M.Intersect<
    M.Array<M.Const<"foo">>,
    M.Exclude<M.Array<M.Primitive<string>>, M.Const<[]>>
  >,
  M.Exclude<M.Array<M.Const<"foo">>, M.Const<[]>>
> = 1;
intersectingExclusion;
