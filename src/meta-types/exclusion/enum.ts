import type { UnionLast } from "~/utils/unionLast";

import type { AnyType } from "../any";
import type { ArrayType } from "../array";
import type { Const, ConstType } from "../const";
import type { Enum, EnumType, EnumValues } from "../enum";
import type { $Intersect } from "../intersection";
import type { Never, NeverType } from "../never";
import type { ObjectType } from "../object";
import type { PrimitiveType } from "../primitive";
import type { TupleType } from "../tuple";
import type { Type } from "../type";
import type { UnionType } from "../union";
import type { _Exclude } from "./index";
import type { ExcludeUnion } from "./union";

/**
 * Excludes from an `Enum` meta-type any other meta-type
 * @param META_ENUM EnumType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
export type ExcludeFromEnum<
  META_ENUM extends EnumType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_ENUM
    : META_TYPE extends AnyType
    ? Never
    : META_TYPE extends ConstType
    ? FilterEnumExcluded<META_ENUM, META_TYPE>
    : META_TYPE extends EnumType
    ? FilterEnumExcluded<META_ENUM, META_TYPE>
    : META_TYPE extends PrimitiveType
    ? FilterEnumExcluded<META_ENUM, META_TYPE>
    : META_TYPE extends ArrayType
    ? FilterEnumExcluded<META_ENUM, META_TYPE>
    : META_TYPE extends TupleType
    ? FilterEnumExcluded<META_ENUM, META_TYPE>
    : META_TYPE extends ObjectType
    ? FilterEnumExcluded<META_ENUM, META_TYPE>
    : META_TYPE extends UnionType
    ? ExcludeUnion<META_ENUM, META_TYPE>
    : Never
  : Never;

/**
 * Build a new `Enum` meta-type with the values of the original `Enum` that are not excluded by a given meta-type (i.e. exclusion is representable)
 * @param META_ENUM EnumType
 * @param META_TYPE MetaType
 * @returns EnumType
 */
type FilterEnumExcluded<
  META_ENUM extends EnumType,
  META_TYPE extends Type,
> = Enum<FilterEnumExcludedValues<EnumValues<META_ENUM>, META_TYPE>>;

/**
 * Filters the values of an `Enum` meta-type that are not excluded by a given meta-type (i.e. exclusion is representable)
 * @param ENUM_VALUES Type
 * @param META_TYPE MetaType
 * @returns EnumType
 */
type FilterEnumExcludedValues<
  ENUM_VALUES,
  META_TYPE extends Type,
> = ENUM_VALUES extends infer ENUM_VALUE
  ? _Exclude<Const<ENUM_VALUE>, META_TYPE> extends NeverType
    ? never
    : ENUM_VALUE
  : never;

/**
 * Excludes from any meta-type an `Enum` meta-type
 * @param META_TYPE MetaType
 * @param META_ENUM EnumType
 * @returns MetaType
 */
export type ExcludeEnum<
  META_TYPE extends Type,
  ENUM_TYPE extends EnumType,
  ENUM_VALUES = EnumValues<ENUM_TYPE>,
> = ExcludeEnumValue<META_TYPE, UnionLast<ENUM_VALUES>, ENUM_VALUES>;

/**
 * Recursively excludes an `Enum` meta-type values from any meta-type
 *
 * To do so, we pick a value, exclude it from the meta-type and intersect the result to the exclusion of the rest: `A \ (B | C) = (A \ B) & (A \ C)`
 * @param META_TYPE MetaType
 * @param LAST_ENUM_VALUE Type
 * @param ENUM_VALUES Type
 * @returns MetaType
 */
type ExcludeEnumValue<
  META_TYPE extends Type,
  LAST_ENUM_VALUE,
  ENUM_VALUES,
> = $Intersect<
  _Exclude<META_TYPE, Const<LAST_ENUM_VALUE>>,
  _Exclude<META_TYPE, Enum<Exclude<ENUM_VALUES, LAST_ENUM_VALUE>>>
>;
