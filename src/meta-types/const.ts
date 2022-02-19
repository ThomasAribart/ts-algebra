import { A, B } from "ts-toolbelt";

import { Never } from "./never";

export type ConstTypeId = "const";

export type Const<V extends any> = A.Equals<V, never> extends B.True
  ? Never
  : { type: ConstTypeId; value: V };

export type ConstType = {
  type: ConstTypeId;
  value: any;
};

export type ConstValue<C extends ConstType> = C["value"];

export type ResolveConst<T extends ConstType> = ConstValue<T>;
