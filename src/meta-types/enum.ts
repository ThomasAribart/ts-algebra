import type { And, If, IsNever } from "../utils";
import type { Never } from "./never";
import type { ResolveOptions } from "./resolve";
import type { Deserialized, IsSerialized } from "./utils";

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
  values: unknown;
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
