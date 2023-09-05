import type { If, IsNever, IsObject } from "~/utils";

import type { AnyType } from "../any";
import type { ArrayType } from "../array";
import type { Const, ConstType, ConstValue } from "../const";
import type { EnumType } from "../enum";
import type { Never, NeverType } from "../never";
import type { ObjectRequiredKeys, ObjectType, ObjectValue } from "../object";
import type { PrimitiveType } from "../primitive";
import type { Resolve } from "../resolve";
import type { TupleType } from "../tuple";
import type { SerializableType, Type } from "../type";
import type { UnionType } from "../union";
import type { Intersect } from "./index";
import type { DistributeIntersection } from "./union";
import type { IntersectDeserialized, IntersectIsSerialized } from "./utils";

/**
 * Intersects a `Const` meta-type deserialization parameters with those of another meta-type
 * @param META_CONST ConstType
 * @param SERIALIZABLE_META_TYPE SerializableType
 * @returns ConstType
 */
export type IntersectConstSerializationParams<
  META_CONST extends ConstType,
  SERIALIZABLE_META_TYPE extends SerializableType,
> = Const<
  ConstValue<META_CONST>,
  IntersectIsSerialized<META_CONST, SERIALIZABLE_META_TYPE>,
  IntersectDeserialized<META_CONST, SERIALIZABLE_META_TYPE>
>;

/**
 * Intersects a `Const` meta-type with any other meta-type
 * @param META_CONST ConstType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
export type IntersectConst<
  META_CONST extends ConstType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_TYPE
    : META_TYPE extends AnyType
    ? IntersectConstSerializationParams<META_CONST, META_TYPE>
    : META_TYPE extends ConstType
    ? CheckExtendsResolved<META_CONST, META_TYPE>
    : META_TYPE extends EnumType
    ? IntersectConstToEnum<META_CONST, META_TYPE>
    : META_TYPE extends PrimitiveType
    ? IntersectConstToPrimitive<META_CONST, META_TYPE>
    : META_TYPE extends ArrayType
    ? IntersectConstToArray<META_CONST, META_TYPE>
    : META_TYPE extends TupleType
    ? IntersectConstToTuple<META_CONST, META_TYPE>
    : META_TYPE extends ObjectType
    ? IntersectConstToObject<META_CONST, META_TYPE>
    : META_TYPE extends UnionType
    ? DistributeIntersection<META_TYPE, META_CONST>
    : Never
  : Never;

/**
 * Returns the `Const` meta-type if it extends the resolved value of another meta-type (without deserialization), the `Never` meta-type otherwise
 * @param META_CONST ConstType
 * @param SERIALIZABLE_META_TYPE SerializableType
 * @returns MetaType
 */
type CheckExtendsResolved<
  META_CONST extends ConstType,
  SERIALIZABLE_META_TYPE extends SerializableType,
> = ConstValue<META_CONST> extends Resolve<
  SERIALIZABLE_META_TYPE,
  { deserialize: false }
>
  ? IntersectConstSerializationParams<META_CONST, SERIALIZABLE_META_TYPE>
  : Never;

/**
 * Intersects a `Const` meta-type with an `Enum` meta-type
 * @param META_CONST ConstType
 * @param META_ENUM EnumType
 * @returns MetaType
 */
export type IntersectConstToEnum<
  META_CONST extends ConstType,
  META_ENUM extends EnumType,
> = CheckExtendsResolved<META_CONST, META_ENUM>;

/**
 * Intersects a `Const` meta-type with a `Primitive` meta-type
 * @param META_CONST ConstType
 * @param META_PRIMITIVE PrimitiveType
 * @returns MetaType
 */
export type IntersectConstToPrimitive<
  META_CONST extends ConstType,
  META_PRIMITIVE extends PrimitiveType,
> = CheckExtendsResolved<META_CONST, META_PRIMITIVE>;

/**
 * Intersects a `Const` meta-type with an `Array` meta-type
 * @param META_CONST ConstType
 * @param META_ARRAY ArrayType
 * @returns MetaType
 */
export type IntersectConstToArray<
  META_CONST extends ConstType,
  META_ARRAY extends ArrayType,
> = CheckExtendsResolved<META_CONST, META_ARRAY>;

/**
 * Intersects a `Const` meta-type with a `Tuple` meta-type
 * @param META_CONST ConstType
 * @param META_TUPLE TupleType
 * @returns MetaType
 */
export type IntersectConstToTuple<
  META_CONST extends ConstType,
  META_TUPLE extends TupleType,
> = CheckExtendsResolved<META_CONST, META_TUPLE>;

/**
 * Intersects a `Const` meta-type with an `Object` meta-type
 * @param META_CONST ConstType
 * @param META_OBJECT ObjectType
 * @returns MetaType
 */
export type IntersectConstToObject<
  META_CONST extends ConstType,
  META_OBJECT extends ObjectType,
> = If<
  IsObject<ConstValue<META_CONST>>,
  IntersectObjectConstToObject<META_CONST, META_OBJECT>,
  Never
>;

/**
 * Intersects a `Const` meta-type (whose value is an object) to an `Object` meta-type
 * @param META_CONST ConstType
 * @param META_OBJECT ObjectType
 * @returns MetaType
 */
type IntersectObjectConstToObject<
  META_CONST extends ConstType,
  META_OBJECT extends ObjectType,
  INTERSECTED_META_OBJECT = IntersectConstValuesToObjectValues<
    ConstValue<META_CONST>,
    META_OBJECT
  >,
> = If<
  IsNever<NeverKeys<INTERSECTED_META_OBJECT>>,
  IntersectConstSerializationParams<META_CONST, META_OBJECT>,
  Never
>;

/**
 * Intersects the value of a `Const` meta-type with an `Object` meta-type (including its required keys)
 * @param CONST_VALUE Type
 * @param META_OBJECT ObjectType
 * @returns Record<string, MetaType>
 */
type IntersectConstValuesToObjectValues<
  CONST_VALUE,
  META_OBJECT extends ObjectType,
> = {
  [KEY in Extract<
    keyof CONST_VALUE | ObjectRequiredKeys<META_OBJECT>,
    string
  >]: KEY extends keyof CONST_VALUE
    ? Intersect<Const<CONST_VALUE[KEY]>, ObjectValue<META_OBJECT, KEY>>
    : Never;
};

/**
 * Given an `Object` meta-type, returns the keys of its values that extend the `Never` meta-type
 * @param META_OBJECT ObjectType
 * @returns string
 */
type NeverKeys<META_OBJECT> = {
  [KEY in keyof META_OBJECT]: META_OBJECT[KEY] extends Never ? KEY : never;
}[keyof META_OBJECT];
