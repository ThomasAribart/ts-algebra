import type { AnyType, ResolveAny } from "./any";
import type { ArrayType, ResolveArray } from "./array";
import type { ConstType, ResolveConst } from "./const";
import type { EnumType, ResolveEnum } from "./enum";
import type { NeverType, ResolveNever } from "./never";
import type { ObjectType, ResolveObject } from "./object";
import type { PrimitiveType, ResolvePrimitive } from "./primitive";
import type { ResolveTuple, TupleType } from "./tuple";
import type { Type } from "./type";
import type { ResolveUnion, UnionType } from "./union";

/**
 * Meta-type resolution options type constraint
 */
export type ResolveOptions = {
  deserialize: boolean;
};

/**
 * Meta-type default resolution options
 */
export type ResolveDefaultOptions = {
  deserialize: true;
};

/**
 * Resolves any meta-type to its encapsulated type
 * @param META_TYPE MetaType
 * @param OPTIONS ResolveOptions
 * @returns Type
 */
export type Resolve<
  META_TYPE extends Type,
  OPTIONS extends ResolveOptions = ResolveDefaultOptions,
> = $Resolve<META_TYPE, OPTIONS>;

/**
 * Resolves any meta-type to its encapsulated type (without type constraints)
 * @param META_TYPE MetaType
 * @param OPTIONS ResolveOptions
 * @returns Type
 */
export type $Resolve<
  META_TYPE,
  OPTIONS extends ResolveOptions = ResolveDefaultOptions,
> = META_TYPE extends AnyType
  ? ResolveAny<META_TYPE, OPTIONS>
  : META_TYPE extends NeverType
  ? ResolveNever
  : META_TYPE extends ConstType
  ? ResolveConst<META_TYPE, OPTIONS>
  : META_TYPE extends EnumType
  ? ResolveEnum<META_TYPE, OPTIONS>
  : META_TYPE extends PrimitiveType
  ? ResolvePrimitive<META_TYPE, OPTIONS>
  : META_TYPE extends ArrayType
  ? ResolveArray<META_TYPE, OPTIONS>
  : META_TYPE extends TupleType
  ? ResolveTuple<META_TYPE, OPTIONS>
  : META_TYPE extends ObjectType
  ? ResolveObject<META_TYPE, OPTIONS>
  : META_TYPE extends UnionType
  ? ResolveUnion<META_TYPE, OPTIONS>
  : never;
