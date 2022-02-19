import { A } from "ts-toolbelt";

import { If } from "../utils";

import { Never } from "./never";

export type PrimitiveTypeId = "primitive";

export type Primitive<T extends null | boolean | number | string> =
  $Primitive<T>;

// TOIMPROVE: We could check that T extends either null, boolean, number or string with DoesExtend<T, PRIMITIVE_TYPE> extends true ? continue : Never
export type $Primitive<T> = If<
  A.Equals<T, never>,
  Never,
  { type: PrimitiveTypeId; value: T }
>;

export type PrimitiveType = {
  type: PrimitiveTypeId;
  value: null | boolean | number | string;
};

export type PrimitiveValue<T extends PrimitiveType> = T["value"];

export type ResolvePrimitive<T extends PrimitiveType> = PrimitiveValue<T>;
