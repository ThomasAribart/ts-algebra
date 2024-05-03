import type { A } from "ts-toolbelt";

import type { M } from "~/index";

// --- INSTANCIATION ---

const requiredNeverKey: A.Equals<
  M.Object<{ a: M.Const<"A">; b: M.Never }, "b">,
  M.Never
> = 1;
requiredNeverKey;

const requiredMissingKeyClosed: A.Equals<M.Object<{}, "b">, M.Never> = 1;
requiredMissingKeyClosed;

const requiredNeverKeyOpen: A.Equals<M.Object<{}, "b">, M.Never> = 1;
requiredNeverKeyOpen;

// --- OPEN ---

const testOpenWithConflict: A.Equals<
  M.Resolve<
    M.Object<
      { str: M.Primitive<string>; num: M.Primitive<number> },
      "str",
      M.Primitive<string>
    >
  >,
  { str: string; num?: number | undefined; [k: string]: unknown }
> = 1;
testOpenWithConflict;

const testOpenWithoutConflict: A.Equals<
  M.Resolve<M.Object<{}, never, M.Primitive<string>>>,
  { [k: string]: string }
> = 1;
testOpenWithoutConflict;

const testClosedOnResolve: A.Equals<
  M.Resolve<
    M.Object<
      { str: M.Primitive<string>; num: M.Primitive<number> },
      "str",
      M.Primitive<string>,
      true
    >
  >,
  { str: string; num?: number | undefined }
> = 1;
testClosedOnResolve;

// --- CLOSED ---

const testClosed: A.Equals<
  M.Resolve<
    M.Object<{ str: M.Primitive<string>; num: M.Primitive<number> }, "str">
  >,
  { str: string; num?: number | undefined }
> = 1;
testClosed;

const testClosedImpossible: A.Equals<
  M.Resolve<M.Object<{ str: M.Primitive<string> }, "str" | "num">>,
  never
> = 1;
testClosedImpossible;

// --- SERIALIZED ---

const serialized: A.Equals<
  M.Resolve<
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      false,
      true,
      { date: Date }
    >
  >,
  { date: Date }
> = 1;
serialized;

const serializedIgnored: A.Equals<
  M.Resolve<
    M.Object<
      { date: M.Primitive<string> },
      "date",
      M.Never,
      false,
      true,
      { date: Date }
    >,
    { deserialize: false }
  >,
  { date: string }
> = 1;
serializedIgnored;
