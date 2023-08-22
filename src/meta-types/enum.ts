import type { And, If, IsNever } from "~/utils";

import type { Never } from "./never";
import type { ResolveOptions } from "./resolve";
import type { Deserialized, IsSerialized } from "./utils";

/**
 * Type id of the `Enum` meta-type
 */
export type EnumTypeId = "enum";

/**
 * Defines an `Enum` meta-type
 * @param VALUES Type
 * @param IS_SERIALIZED Boolean
 * @param DESERIALIZED Type
 */
export type Enum<
  VALUES,
  IS_SERIALIZED extends boolean = false,
  DESERIALIZED = never,
> = If<
  IsNever<VALUES>,
  Never,
  {
    type: EnumTypeId;
    values: VALUES;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
  }
>;

/**
 * Any `Enum` meta-type
 */
export type EnumType = {
  type: EnumTypeId;
  values: unknown;
  isSerialized: boolean;
  deserialized: unknown;
};

export type EnumValues<META_ENUM extends EnumType> = META_ENUM["values"];

/**
 * Resolves an `Enum` meta-type to its encapsulated type
 * @param META_ENUM EnumType
 * @param OPTIONS ResolveOptions
 * @returns Type
 */
export type ResolveEnum<
  META_ENUM extends EnumType,
  OPTIONS extends ResolveOptions,
> = If<
  And<OPTIONS["deserialize"], IsSerialized<META_ENUM>>,
  Deserialized<META_ENUM>,
  EnumValues<META_ENUM>
>;
