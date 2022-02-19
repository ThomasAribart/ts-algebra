import { A } from "ts-toolbelt";

import { M } from "index";

const test: A.Equals<M.Resolve<M.Any>, unknown> = 1;
test;
