import type { And, If, IsNever } from "../utils";
import type { Never } from "./never";
import type { ResolveOptions } from "./resolve";
import type { Deserialized, IsSerialized } from "./utils";

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
  value: unknown;
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
