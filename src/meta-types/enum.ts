import { If, IsNever, And } from "../utils";

import { Never } from "./never";
import { ResolveOptions } from "./resolve";
import { Deserialized, IsSerialized } from "./utils";

export type EnumTypeId = "enum";

export type Enum<V, I extends boolean = false, D = never> = If<
  IsNever<V>,
  Never,
  {
    type: EnumTypeId;
    values: V;
    isSerialized: I;
    deserialized: D;
  }
>;

export type EnumType = {
  type: EnumTypeId;
  values: any;
  isSerialized: boolean;
  deserialized: unknown;
};

export type EnumValues<E extends EnumType> = E["values"];

export type ResolveEnum<T extends EnumType, O extends ResolveOptions> = And<
  O["deserialize"],
  IsSerialized<T>
> extends true
  ? Deserialized<T>
  : EnumValues<T>;
