import { A } from "ts-toolbelt";

import { M } from "index";

// --- INSTANCIATION ---

const neverValue: A.Equals<M.Array<M.Never>, M.Array<M.Never>> = 1;
neverValue;

// --- ANY ---

const test1: A.Equals<M.Resolve<M.Array<M.Any>>, unknown[]> = 1;
test1;

//  --- NEVER ---

const test2: A.Equals<M.Resolve<M.Array<M.Never>>, []> = 1;
test2;

// --- CONST ---

const test3: A.Equals<M.Resolve<M.Array<M.Const<"foo">>>, "foo"[]> = 1;
test3;

// --- ENUM ---

const test4: A.Equals<
  M.Resolve<M.Array<M.Enum<"foo" | "bar" | 42>>>,
  ("foo" | "bar" | 42)[]
> = 1;
test4;

// --- PRIMITIVES ---

const test5: A.Equals<M.Resolve<M.Array<M.Primitive<string>>>, string[]> = 1;
test5;

// --- ARRAY ---

const test6: A.Equals<
  M.Resolve<M.Array<M.Array<M.Primitive<string>>>>,
  string[][]
> = 1;
test6;

// --- TUPLE ---

const test7: A.Equals<
  M.Resolve<M.Array<M.Tuple<[M.Primitive<string>]>>>,
  [string][]
> = 1;
test7;

// --- OBJECT ---

const test8: A.Equals<
  M.Resolve<
    M.Array<
      M.Object<{ foo: M.Primitive<string>; bar: M.Primitive<number> }, "bar">
    >
  >,
  { foo?: string | undefined; bar: number }[]
> = 1;
test8;

// --- UNION ---

const test9: A.Equals<
  M.Resolve<M.Array<M.Union<M.Primitive<string> | M.Const<42>>>>,
  (string | 42)[]
> = 1;
test9;

// --- INTERSECTION ---

const test10: A.Equals<
  M.Resolve<M.Array<M.Intersect<M.Primitive<string>, M.Const<"foo">>>>,
  "foo"[]
> = 1;
test10;

// --- ERROR ---

const test11: A.Equals<M.Resolve<M.Array<M.Error<"Any">>>, never[]> = 1;
test11;
