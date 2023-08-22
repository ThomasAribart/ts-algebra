import type { DoesExtend, If, IsNever } from "../utils";
import type { Never, NeverType } from "./never";
import type { $Resolve, ResolveOptions } from "./resolve";
import type { Type } from "./type";

/**
 * Type id of the `Union` meta-type
 */
export type UnionTypeId = "union";

/**
 * Defines a `Union` meta-type
 * @param VALUES MetaType
 */
export type Union<VALUES extends Type> = $Union<VALUES>;

/**
 * Defines a `Union` meta-type (without type constraints)
 * @param VALUES MetaType
 */
export type $Union<VALUES> = If<
  // TOIMPROVE: Maybe we can filter out Never values at instanciation
  IsNever<VALUES>,
  Never,
  // V extends NeverType should not be used as it spreads the union (Union<A | B> => Union<A> | Union<B>)
  DoesExtend<VALUES, NeverType> extends true
    ? Never
    : { type: UnionTypeId; values: VALUES }
>;

/**
 * Any `Union` meta-type
 */
export type UnionType = {
  type: UnionTypeId;
  values: Type;
};

export type UnionValues<U extends UnionType> = U["values"];

/**
 * Resolves a `Union` meta-type to its encapsulated type
 * @param META_UNION UnionType
 * @param OPTIONS ResolveOptions
 * @returns Type
 */
export type ResolveUnion<
  META_UNION extends UnionType,
  OPTIONS extends ResolveOptions,
> = RecurseOnUnion<UnionValues<META_UNION>, OPTIONS>;

type RecurseOnUnion<
  VALUES extends Type,
  OPTIONS extends ResolveOptions,
> = VALUES extends infer T ? $Resolve<T, OPTIONS> : never;
