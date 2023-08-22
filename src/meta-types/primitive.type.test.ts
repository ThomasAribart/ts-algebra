import type { A } from "ts-toolbelt";

import type { M } from "~/index";

// --- INSTANCIATION ---

const noValue: A.Equals<M.Primitive<never>, M.Never> = 1;
noValue;

// --- PRIMITIVE ---

const testNull: A.Equals<M.Resolve<M.Primitive<null>>, null> = 1;
testNull;

const testBoolean: A.Equals<M.Resolve<M.Primitive<boolean>>, boolean> = 1;
testBoolean;

const testNumber: A.Equals<M.Resolve<M.Primitive<number>>, number> = 1;
testNumber;

const testString: A.Equals<M.Resolve<M.Primitive<string>>, string> = 1;
testString;

// --- SERIALIZED ---

const serialized: A.Equals<
  M.Resolve<M.Primitive<string, true, Date>>,
  Date
> = 1;
serialized;

const serializedIgnored: A.Equals<
  M.Resolve<M.Primitive<string, true, Date>, { deserialize: false }>,
  string
> = 1;
serializedIgnored;
