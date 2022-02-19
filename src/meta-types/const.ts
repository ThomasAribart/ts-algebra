import { A } from "ts-toolbelt";

import { If } from "../utils";

import { Never } from "./never";

export type ConstTypeId = "const";

export type Const<V extends any> = If<
  A.Equals<V, never>,
  Never,
  { type: ConstTypeId; value: V }
>;

export type ConstType = {
  type: ConstTypeId;
  value: any;
};

export type ConstValue<C extends ConstType> = C["value"];

export type ResolveConst<T extends ConstType> = ConstValue<T>;
