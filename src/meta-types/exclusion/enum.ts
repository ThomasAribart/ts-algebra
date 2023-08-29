import type { UnionLast } from "../../utils/unionLast";
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
    ? FilterExcluded<META_ENUM, META_TYPE>
    : META_TYPE extends EnumType
    ? FilterExcluded<META_ENUM, META_TYPE>
    : META_TYPE extends PrimitiveType
    ? FilterExcluded<META_ENUM, META_TYPE>
    : META_TYPE extends ArrayType
    ? FilterExcluded<META_ENUM, META_TYPE>
    : META_TYPE extends TupleType
    ? FilterExcluded<META_ENUM, META_TYPE>
    : META_TYPE extends ObjectType
    ? FilterExcluded<META_ENUM, META_TYPE>
    : META_TYPE extends UnionType
    ? ExcludeUnion<META_ENUM, META_TYPE>
    : Never
  : Never;

type FilterExcluded<META_ENUM extends EnumType, META_TYPE extends Type> = Enum<
  RecurseOnEnumValues<EnumValues<META_ENUM>, META_TYPE>
>;

type RecurseOnEnumValues<
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

type ExcludeEnumValue<
  META_TYPE extends Type,
  LAST_ENUM_VALUE,
  ENUM_VALUES,
> = $Intersect<
  _Exclude<META_TYPE, Const<LAST_ENUM_VALUE>>,
  _Exclude<META_TYPE, Enum<Exclude<ENUM_VALUES, LAST_ENUM_VALUE>>>
>;
