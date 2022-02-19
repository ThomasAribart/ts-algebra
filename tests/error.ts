import { A } from "ts-toolbelt";

import { M } from "index";

const test: A.Equals<M.Resolve<M.Error<"Any">>, never> = 1;
test;
