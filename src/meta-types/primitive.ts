import type { And, If, IsNever } from "~/utils";

import type { Never } from "./never";
import type { ResolveOptions } from "./resolve";
import type { Deserialized, IsSerialized } from "./utils";

/**
 * Type id of the `Primitive` meta-type
 */
export type PrimitiveTypeId = "primitive";

/**
 * Defines a `Primitive` meta-type
 * @param VALUE Null | Boolean | Number | String
 * @param IS_SERIALIZED Boolean
 * @param DESERIALIZED Type
 */
export type Primitive<
  VALUE extends null | boolean | number | string,
  IS_SERIALIZED extends boolean = false,
  DESERIALIZED = never,
> = $Primitive<VALUE, IS_SERIALIZED, DESERIALIZED>;

/**
 * Defines a `Primitive` meta-type (without type constraints)
 * @param VALUE Null | Boolean | Number | String
 * @param IS_SERIALIZED Boolean
 * @param DESERIALIZED Type
 */
export type $Primitive<VALUE, IS_SERIALIZED = false, DESERIALIZED = never> = If<
  // TOIMPROVE: We could check that T extends either null, boolean, number or string with DoesExtend<T, PRIMITIVE_TYPE> extends true ? continue : Never
  IsNever<VALUE>,
  Never,
  {
    type: PrimitiveTypeId;
    value: VALUE;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
  }
>;

/**
 * Any `Primitive` meta-type
 */
export type PrimitiveType = {
  type: PrimitiveTypeId;
  value: null | boolean | number | string;
  isSerialized: boolean;
  deserialized: unknown;
};

/**
 * Return the value of a `Primitive` meta-type
 * @param META_PRIMITIVE PrimitiveType
 * @returns Null | Boolean | Number | String
 */
export type PrimitiveValue<META_PRIMITIVE extends PrimitiveType> =
  META_PRIMITIVE["value"];

/**
 * Resolves a `Primitive` meta-type to its encapsulated type
 * @param META_PRIMITIVE PrimitiveType
 * @param OPTIONS ResolveOptions
 * @returns Type
 */
export type ResolvePrimitive<
  META_PRIMITIVE extends PrimitiveType,
  OPTIONS extends ResolveOptions,
> = If<
  And<OPTIONS["deserialize"], IsSerialized<META_PRIMITIVE>>,
  Deserialized<META_PRIMITIVE>,
  PrimitiveValue<META_PRIMITIVE>
>;
