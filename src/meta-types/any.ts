import type { And, If } from "~/utils";

import type { ResolveOptions } from "./resolve";
import type { Deserialized, IsSerialized } from "./utils";

/**
 * Type id of the `Any` meta-type
 */
export type AnyTypeId = "any";

/**
 * Defines an `Any` meta-type
 * @param IS_SERIALIZED Boolean
 * @param DESERIALIZED Type
 */
export type Any<IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = {
  type: AnyTypeId;
  isSerialized: IS_SERIALIZED;
  deserialized: DESERIALIZED;
};

/**
 * Any `Any` meta-type
 */
export type AnyType = {
  type: AnyTypeId;
  isSerialized: boolean;
  deserialized: unknown;
};

/**
 * Resolves an `Any` meta-type to its encapsulated type
 * @param ANY AnyType
 * @param OPTIONS ResolveOptions
 * @returns Type
 */
export type ResolveAny<
  META_ANY extends AnyType,
  OPTIONS extends ResolveOptions,
> = If<
  And<OPTIONS["deserialize"], IsSerialized<META_ANY>>,
  Deserialized<META_ANY>,
  unknown
>;
