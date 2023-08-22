import type { And, If, IsNever } from "../utils";
import type { Never } from "./never";
import type { ResolveOptions } from "./resolve";
import type { Deserialized, IsSerialized } from "./utils";

export type PrimitiveTypeId = "primitive";

export type Primitive<
  T extends null | boolean | number | string,
  I extends boolean = false,
  D = never,
> = $Primitive<T, I, D>;

// TOIMPROVE: We could check that T extends either null, boolean, number or string with DoesExtend<T, PRIMITIVE_TYPE> extends true ? continue : Never
export type $Primitive<T, I = false, D = never> = If<
  IsNever<T>,
  Never,
  {
    type: PrimitiveTypeId;
    value: T;
    isSerialized: I;
    deserialized: D;
  }
>;

export type PrimitiveType = {
  type: PrimitiveTypeId;
  value: null | boolean | number | string;
  isSerialized: boolean;
  deserialized: unknown;
};

export type PrimitiveValue<T extends PrimitiveType> = T["value"];

export type ResolvePrimitive<
  T extends PrimitiveType,
  O extends ResolveOptions,
> = And<O["deserialize"], IsSerialized<T>> extends true
  ? Deserialized<T>
  : PrimitiveValue<T>;
