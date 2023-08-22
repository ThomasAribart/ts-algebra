import type { A } from "ts-toolbelt";

import type { M } from "~/index";

const test: A.Equals<M.Resolve<M.Never>, never> = 1;
test;
