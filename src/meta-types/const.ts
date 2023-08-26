import type { And, If, IsNever } from "~/utils";

import type { Never } from "./never";
import type { ResolveOptions } from "./resolve";
import type { Deserialized, IsSerialized } from "./utils";

/**
 * Type id of the `Const` meta-type
 */
export type ConstTypeId = "const";

/**
 * Defines a `Const` meta-type
 * @param VALUE Type
 * @param IS_SERIALIZED Boolean
 * @param DESERIALIZED Type
 */
export type Const<
  VALUE,
  IS_SERIALIZED extends boolean = false,
  DESERIALIZED = never,
> = If<
  IsNever<VALUE>,
  Never,
  {
    type: ConstTypeId;
    value: VALUE;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
  }
>;

/**
 * Any `Const` meta-type
 */
export type ConstType = {
  type: ConstTypeId;
  value: unknown;
  isSerialized: boolean;
  deserialized: unknown;
};

/**
 * Return the value of a `Const` meta-type
 * @param META_CONST ConstType
 * @returns Type
 */
export type ConstValue<META_CONST extends ConstType> = META_CONST["value"];

/**
 * Resolves a `Const` meta-type to its encapsulated type
 * @param META_CONST ConstType
 * @param OPTIONS ResolveOptions
 * @returns Type
 */
export type ResolveConst<
  META_CONST extends ConstType,
  OPTIONS extends ResolveOptions,
> = If<
  And<OPTIONS["deserialize"], IsSerialized<META_CONST>>,
  Deserialized<META_CONST>,
  ConstValue<META_CONST>
>;
