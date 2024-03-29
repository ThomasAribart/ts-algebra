import type { A } from "ts-toolbelt";

import type { M } from "~/index";

const test1: A.Equals<
  M.Resolve<M.Exclude<M.Enum<"foo" | 42>, M.Primitive<string>>>,
  42
> = 1;
test1;

const test2: A.Equals<
  M.Resolve<M.Exclude<M.Enum<"foo" | "bar">, M.Const<"bar">>>,
  "foo"
> = 1;
test2;

const test3: A.Equals<
  M.Resolve<
    M.Exclude<
      M.Union<
        | M.Object<{}, never, M.Any>
        | M.Tuple<[M.Primitive<string>], M.Any>
        | M.Primitive<string>
      >,
      M.Union<M.Primitive<string> | M.Tuple<[M.Any], M.Any>>
    >
  >,
  { [k: string]: unknown }
> = 1;
test3;

const test4: A.Equals<
  M.Resolve<
    M.Exclude<
      M.Union<M.Never | M.Const<"B"> | M.Const<"C">>,
      M.Union<M.Const<"A"> | M.Const<"B">>
    >
  >,
  "C"
> = 1;
test4;
