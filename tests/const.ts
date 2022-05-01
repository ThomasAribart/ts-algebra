import { A } from "ts-toolbelt";

import { M } from "index";

// --- INSTANCIATION ---

const noValue: A.Equals<M.Const<never>, M.Never> = 1;
noValue;

// --- PRIMITIVE ---

const test1: A.Equals<M.Resolve<M.Const<null>>, null> = 1;
test1;

const test2: A.Equals<M.Resolve<M.Const<true>>, true> = 1;
test2;

const test3: A.Equals<M.Resolve<M.Const<"foo">>, "foo"> = 1;
test3;

const test4: A.Equals<M.Resolve<M.Const<42>>, 42> = 1;
test4;

// --- TUPLE ---

const test5: A.Equals<M.Resolve<M.Const<["foo", "bar"]>>, ["foo", "bar"]> = 1;
test5;

// --- OBJECT ---

const test6: A.Equals<M.Resolve<M.Const<{ foo: "bar" }>>, { foo: "bar" }> = 1;
test6;

// --- SERIALIZED ---

const serialized: A.Equals<
  M.Resolve<M.Const<"2022-01-01", true, Date>>,
  Date
> = 1;
serialized;

const serializedIgnored: A.Equals<
  M.Resolve<M.Const<"2022-01-01", true, Date>, { deserialize: false }>,
  "2022-01-01"
> = 1;
serializedIgnored;
