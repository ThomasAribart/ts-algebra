import { A } from "ts-toolbelt";

import { M } from "index";

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
