import type { A } from "ts-toolbelt";

import type { M } from "~/index";

const test: A.Equals<M.Resolve<M.Any>, unknown> = 1;
test;

const serialized: A.Equals<M.Resolve<M.Any<true, Date>>, Date> = 1;
serialized;

const serializedIgnored: A.Equals<
  M.Resolve<M.Any<true, Date>, { deserialize: false }>,
  unknown
> = 1;
serializedIgnored;
