import { A } from "ts-toolbelt";

import { M } from "index";

// --- INSTANCIATION ---

const requiredNeverItem: A.Equals<
  M.Tuple<[M.Const<"A">, M.Never]>,
  M.Never
> = 1;
requiredNeverItem;

// --- OPEN ---

const test1: A.Equals<
  M.Resolve<M.Tuple<[M.Primitive<string>, M.Primitive<number>], true>>,
  [string, number, ...unknown[]]
> = 1;
test1;

const test2: A.Equals<
  M.Resolve<
    M.Tuple<
      [M.Primitive<string>, M.Primitive<number>],
      true,
      M.Primitive<boolean>
    >
  >,
  [string, number, ...boolean[]]
> = 1;
test2;

// --- CLOSED ---

const test3: A.Equals<
  M.Resolve<M.Tuple<[M.Primitive<string>, M.Primitive<number>]>>,
  [string, number]
> = 1;
test3;

const neverItem: A.Equals<
  M.Resolve<M.Tuple<[M.Primitive<string>, M.Never]>>,
  never
> = 1;
neverItem;
