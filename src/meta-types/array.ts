import type { And, If, Prettify } from "~/utils";

import type { Any } from "./any";
import type { NeverType } from "./never";
import type { Resolve, ResolveOptions } from "./resolve";
import type { Type } from "./type";
import type { Deserialized, IsSerialized } from "./utils";

/**
 * Type id of the `Array` meta-type
 */
export type ArrayTypeId = "array";

/**
 * Defines an `Array` meta-type
 * @param VALUES MetaType
 * @param IS_SERIALIZED Boolean
 * @param DESERIALIZED Type
 */
export type _Array<
  // ☝️ Prefixed with _ to not confuse with native Array type
  VALUES extends Type = Any,
  IS_SERIALIZED extends boolean = false,
  DESERIALIZED = never,
> = _$Array<VALUES, IS_SERIALIZED, DESERIALIZED>;

/**
 * Defines an `Array` meta-type (without type constraints)
 * @param VALUES MetaType
 * @param IS_SERIALIZED Boolean
 * @param DESERIALIZED Type
 */
export type _$Array<
  VALUES = Any,
  IS_SERIALIZED = false,
  DESERIALIZED = never,
> = {
  // ☝️ Prefixed with _ to not confuse with native Array type
  type: ArrayTypeId;
  values: VALUES;
  isSerialized: IS_SERIALIZED;
  deserialized: DESERIALIZED;
};

/**
 * Any `Array` meta-type
 */
export type ArrayType = {
  type: ArrayTypeId;
  values: Type;
  isSerialized: boolean;
  deserialized: unknown;
};

/**
 * Return the meta-type of an `Array` meta-type values
 * @param META_ARRAY ArrayType
 * @returns MetaType
 */
export type ArrayValues<META_ARRAY extends ArrayType> = META_ARRAY["values"];

/**
 * Resolves an `Array` meta-type to its encapsulated type
 * @param META_ARRAY ArrayType
 * @param OPTIONS ResolveOptions
 * @returns Type
 */
export type ResolveArray<
  META_ARRAY extends ArrayType,
  OPTIONS extends ResolveOptions,
> = If<
  And<OPTIONS["deserialize"], IsSerialized<META_ARRAY>>,
  Deserialized<META_ARRAY>,
  ArrayValues<META_ARRAY> extends NeverType
    ? []
    : Prettify<Resolve<ArrayValues<META_ARRAY>, OPTIONS>[]>
>;
