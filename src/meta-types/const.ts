import { If, And, IsNever } from "../utils";

import { Never } from "./never";
import { ResolveOptions } from "./resolve";
import { Deserialized, IsSerialized } from "./utils";

export type ConstTypeId = "const";

export type Const<V, I extends boolean = false, D = never> = If<
  IsNever<V>,
  Never,
  {
    type: ConstTypeId;
    value: V;
    isSerialized: I;
    deserialized: D;
  }
>;

export type ConstType = {
  type: ConstTypeId;
  value: any;
  isSerialized: boolean;
  deserialized: unknown;
};

export type ConstValue<C extends ConstType> = C["value"];

export type ResolveConst<T extends ConstType, O extends ResolveOptions> = And<
  O["deserialize"],
  IsSerialized<T>
> extends true
  ? Deserialized<T>
  : ConstValue<T>;
