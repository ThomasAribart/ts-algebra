import type { AnyType } from "../any";
import type { _$Array, ArrayType, ArrayValues } from "../array";
import type { ConstType } from "../const";
import type { EnumType } from "../enum";
import type { Never, NeverType } from "../never";
import type { ObjectType } from "../object";
import type { PrimitiveType } from "../primitive";
import type { TupleType } from "../tuple";
import type { SerializableType, Type } from "../type";
import type { UnionType } from "../union";
import type { IntersectConstToArray } from "./const";
import type { IntersectEnumToArray } from "./enum";
import type { Intersect } from "./index";
import type { IntersectTupleToArray } from "./tuple";
import type { DistributeIntersection } from "./union";
import type { IntersectDeserialized, IntersectIsSerialized } from "./utils";

/**
 * Intersects an `Array` meta-type deserialization parameters with those of another meta-type
 * @param META_ARRAY_VALUES MetaType
 * @param META_ARRAY ArrayType
 * @param SERIALIZABLE_META_TYPE SerializableType
 * @returns ArrayType
 */
export type IntersectArraySerializationParams<
  VALUES extends Type,
  META_ARRAY extends ArrayType,
  SERIALIZABLE_META_TYPE extends SerializableType,
> = $MergeArrayValuesToSerializable<VALUES, META_ARRAY, SERIALIZABLE_META_TYPE>;

/**
 * Intersects an `Array` meta-type deserialization parameters with those of another meta-type (without type constraints)
 * @param META_ARRAY_VALUES MetaType
 * @param META_ARRAY ArrayType
 * @param SERIALIZABLE_META_TYPE SerializableType
 * @returns ArrayType
 */
type $MergeArrayValuesToSerializable<
  VALUES,
  META_ARRAY extends ArrayType,
  SERIALIZABLE_META_TYPE extends SerializableType,
> = _$Array<
  VALUES,
  IntersectIsSerialized<META_ARRAY, SERIALIZABLE_META_TYPE>,
  IntersectDeserialized<META_ARRAY, SERIALIZABLE_META_TYPE>
>;

/**
 * Intersects an `Array` meta-type with any other meta-type
 * @param META_ARRAY ArrayType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
export type IntersectArray<
  META_ARRAY extends ArrayType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_TYPE
    : META_TYPE extends AnyType
    ? IntersectArraySerializationParams<
        ArrayValues<META_ARRAY>,
        META_ARRAY,
        META_TYPE
      >
    : META_TYPE extends ConstType
    ? IntersectConstToArray<META_TYPE, META_ARRAY>
    : META_TYPE extends EnumType
    ? IntersectEnumToArray<META_TYPE, META_ARRAY>
    : META_TYPE extends PrimitiveType
    ? Never
    : META_TYPE extends ArrayType
    ? IntersectArrays<META_ARRAY, META_TYPE>
    : META_TYPE extends TupleType
    ? IntersectTupleToArray<META_TYPE, META_ARRAY>
    : META_TYPE extends ObjectType
    ? Never
    : META_TYPE extends UnionType
    ? DistributeIntersection<META_TYPE, META_ARRAY>
    : Never
  : Never;

/**
 * Intersects two `Array` meta-types
 * @param META_ARRAY_A ArrayType
 * @param META_ARRAY_B ArrayType
 * @returns MetaType
 */
type IntersectArrays<
  META_ARRAY_A extends ArrayType,
  META_ARRAY_B extends ArrayType,
> = $MergeArrayValuesToSerializable<
  Intersect<ArrayValues<META_ARRAY_A>, ArrayValues<META_ARRAY_B>>,
  META_ARRAY_A,
  META_ARRAY_B
>;
