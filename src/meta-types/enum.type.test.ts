import type { A } from "ts-toolbelt";

import type { M } from "~/index";

// --- INSTANCIATION ---

const noValue: A.Equals<M.Enum<never>, M.Never> = 1;
noValue;

// --- EMPTY ---

const test1: A.Equals<M.Resolve<M.Enum<never>>, never> = 1;
test1;

// --- PRIMITIVE ---

const test2: A.Equals<M.Resolve<M.Enum<"foo" | "bar">>, "foo" | "bar"> = 1;
test2;

// --- TUPLE ---

const test3: A.Equals<M.Resolve<M.Enum<["foo", "bar"]>>, ["foo", "bar"]> = 1;
test3;

// --- OBJECT ---

const test4: A.Equals<M.Resolve<M.Enum<{ foo: "bar" }>>, { foo: "bar" }> = 1;
test4;

// --- SERIALIZED ---

const serialized: A.Equals<
  M.Resolve<M.Enum<"2022-01-01" | "2022-02-01", true, Date>>,
  Date
> = 1;
serialized;

const serializedIgnored: A.Equals<
  M.Resolve<
    M.Enum<"2022-01-01" | "2022-02-01", true, Date>,
    { deserialize: false }
  >,
  "2022-01-01" | "2022-02-01"
> = 1;
serializedIgnored;
