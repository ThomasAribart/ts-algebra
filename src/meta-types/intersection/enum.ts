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

/**
 * Intersects an `Enum` meta-type deserialization parameters with those of another meta-type
 * @param META_ENUM_VALUES Type
 * @param META_ENUM EnumType
 * @param SERIALIZABLE_META_TYPE SerializableType
 * @returns EnumType
 */
export type IntersectEnumSerializationParams<
  META_ENUM_VALUES,
  META_ENUM extends EnumType,
  SERIALIZABLE_META_TYPE extends SerializableType,
> = Enum<
  META_ENUM_VALUES,
  IntersectIsSerialized<META_ENUM, SERIALIZABLE_META_TYPE>,
  IntersectDeserialized<META_ENUM, SERIALIZABLE_META_TYPE>
>;

/**
 * Intersects an `Enum` meta-type with any other meta-type
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
    ? IntersectEnumSerializationParams<
        EnumValues<META_ENUM>,
        META_ENUM,
        META_TYPE
      >
    : META_TYPE extends ConstType
    ? IntersectConstToEnum<META_TYPE, META_ENUM>
    : META_TYPE extends EnumType
    ? FilterEnum<META_ENUM, META_TYPE>
    : META_TYPE extends PrimitiveType
    ? IntersectEnumToPrimitive<META_ENUM, META_TYPE>
    : META_TYPE extends ArrayType
    ? FilterEnum<META_ENUM, META_TYPE>
    : META_TYPE extends TupleType
    ? FilterEnum<META_ENUM, META_TYPE>
    : META_TYPE extends ObjectType
    ? FilterEnum<META_ENUM, META_TYPE>
    : META_TYPE extends UnionType
    ? DistributeIntersection<META_TYPE, META_ENUM>
    : Never
  : Never;

/**
 * Build a new `Enum` meta-type with the values of the original `Enum` that intersect with a given meta-type (i.e. intersection is representable)
 * @param META_ENUM EnumType
 * @param SERIALIZABLE_META_TYPE SerializableType
 * @returns EnumType
 */
type FilterEnum<
  META_ENUM extends EnumType,
  SERIALIZABLE_META_TYPE extends SerializableType,
> = IntersectEnumSerializationParams<
  FilterEnumValues<EnumValues<META_ENUM>, SERIALIZABLE_META_TYPE>,
  META_ENUM,
  SERIALIZABLE_META_TYPE
>;

/**
 * Filters the values of an `Enum` meta-type that intersect with a given meta-type (i.e. intersection is representable)
 * @param ENUM_VALUES Type
 * @param SERIALIZABLE_META_TYPE SerializableType
 * @returns EnumType
 */
type FilterEnumValues<ENUM_VALUES, SERIALIZABLE_META_TYPE> =
  ENUM_VALUES extends infer ENUM_VALUE
    ? $Intersect<Const<ENUM_VALUE>, SERIALIZABLE_META_TYPE> extends Never
      ? never
      : ENUM_VALUE
    : never;

/**
 * Intersects an `Enum` meta-type with a `Primitive` meta-type
 * @param META_ENUM EnumType
 * @param META_PRIMITIVE PrimitiveType
 * @returns MetaType
 */
export type IntersectEnumToPrimitive<
  META_ENUM extends EnumType,
  META_PRIMITIVE extends PrimitiveType,
> = FilterEnum<META_ENUM, META_PRIMITIVE>;

/**
 * Intersects an `Enum` meta-type with an `Array` meta-type
 * @param META_ENUM EnumType
 * @param META_ARRAY ArrayType
 * @returns MetaType
 */
export type IntersectEnumToArray<
  META_ENUM extends EnumType,
  META_ARRAY extends ArrayType,
> = FilterEnum<META_ENUM, META_ARRAY>;

/**
 * Intersects an `Enum` meta-type with a `Tuple` meta-type
 * @param META_ENUM EnumType
 * @param META_TUPLE TupleType
 * @returns MetaType
 */
export type IntersectEnumToTuple<
  META_ENUM extends EnumType,
  META_TUPLE extends TupleType,
> = FilterEnum<META_ENUM, META_TUPLE>;

/**
 * Intersects an `Enum` meta-type with an `Object` meta-type
 * @param META_ENUM EnumType
 * @param META_OBJECT ObjectType
 * @returns MetaType
 */
export type IntersectEnumToObject<
  META_ENUM extends EnumType,
  META_OBJECT extends ObjectType,
> = FilterEnum<META_ENUM, META_OBJECT>;
