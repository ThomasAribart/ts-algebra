import type { AnyType } from "../any";
import type { ArrayType } from "../array";
import type { Const, ConstType } from "../const";
import type { Enum, EnumType, EnumValues } from "../enum";
import type { Never, NeverType } from "../never";
import type { ObjectType } from "../object";
import type { PrimitiveType } from "../primitive";
import type { TupleType } from "../tuple";
import type { SerializableType, Type } from "../type";
import type { UnionType } from "../union";
import type { IntersectConstToEnum } from "./const";
import type { $Intersect } from "./index";
import type { DistributeIntersection } from "./union";
import type { IntersectDeserialized, IntersectIsSerialized } from "./utils";

export type MergeEnumValuesToSerializable<
  ENUM_VALUES,
  META_ENUM extends EnumType,
  SERIALIZABLE_META_TYPE extends SerializableType,
> = Enum<
  ENUM_VALUES,
  IntersectIsSerialized<META_ENUM, SERIALIZABLE_META_TYPE>,
  IntersectDeserialized<META_ENUM, SERIALIZABLE_META_TYPE>
>;

/**
 * Intersects an `Enum` meta-type to any other meta-type
 * @param META_ENUM EnumType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
export type IntersectEnum<
  META_ENUM extends EnumType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_TYPE
    : META_TYPE extends AnyType
    ? MergeEnumValuesToSerializable<EnumValues<META_ENUM>, META_ENUM, META_TYPE>
    : META_TYPE extends ConstType
    ? IntersectConstToEnum<META_TYPE, META_ENUM>
    : META_TYPE extends EnumType
    ? FilterUnintersecting<META_ENUM, META_TYPE>
    : META_TYPE extends PrimitiveType
    ? IntersectEnumToPrimitive<META_ENUM, META_TYPE>
    : META_TYPE extends ArrayType
    ? FilterUnintersecting<META_ENUM, META_TYPE>
    : META_TYPE extends TupleType
    ? FilterUnintersecting<META_ENUM, META_TYPE>
    : META_TYPE extends ObjectType
    ? FilterUnintersecting<META_ENUM, META_TYPE>
    : META_TYPE extends UnionType
    ? DistributeIntersection<META_TYPE, META_ENUM>
    : Never
  : Never;

type FilterUnintersecting<
  META_ENUM extends EnumType,
  SERIALIZABLE_META_TYPE extends SerializableType,
> = MergeEnumValuesToSerializable<
  RecurseOnEnumValues<EnumValues<META_ENUM>, SERIALIZABLE_META_TYPE>,
  META_ENUM,
  SERIALIZABLE_META_TYPE
>;

type RecurseOnEnumValues<ENUM_VALUES, SERIALIZABLE_META_TYPE> =
  ENUM_VALUES extends infer ENUM_VALUE
    ? $Intersect<Const<ENUM_VALUE>, SERIALIZABLE_META_TYPE> extends Never
      ? never
      : ENUM_VALUE
    : never;

/**
 * Intersects an `Enum` meta-type to a `Primitive` meta-type
 * @param META_ENUM EnumType
 * @param META_PRIMITIVE PrimitiveType
 * @returns MetaType
 */
export type IntersectEnumToPrimitive<
  META_ENUM extends EnumType,
  META_PRIMITIVE extends PrimitiveType,
> = FilterUnintersecting<META_ENUM, META_PRIMITIVE>;

/**
 * Intersects an `Enum` meta-type to an `Array` meta-type
 * @param META_ENUM EnumType
 * @param META_ARRAY ArrayType
 * @returns MetaType
 */
export type IntersectEnumToArray<
  META_ENUM extends EnumType,
  META_ARRAY extends ArrayType,
> = FilterUnintersecting<META_ENUM, META_ARRAY>;

/**
 * Intersects an `Enum` meta-type to a `Tuple` meta-type
 * @param META_ENUM EnumType
 * @param META_TUPLE TupleType
 * @returns MetaType
 */
export type IntersectEnumToTuple<
  META_ENUM extends EnumType,
  META_TUPLE extends TupleType,
> = FilterUnintersecting<META_ENUM, META_TUPLE>;

/**
 * Intersects an `Enum` meta-type to an `Object` meta-type
 * @param META_ENUM EnumType
 * @param META_OBJECT ObjectType
 * @returns MetaType
 */
export type IntersectEnumToObject<
  META_ENUM extends EnumType,
  META_OBJECT extends ObjectType,
> = FilterUnintersecting<META_ENUM, META_OBJECT>;
