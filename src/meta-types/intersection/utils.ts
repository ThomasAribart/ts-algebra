import type { If, Or } from "~/utils";

import type { SerializableType } from "../type";
import type { Deserialized, IsSerialized } from "../utils";

/**
 * Returns `true` if one of the provided meta-types is serialized, `false` otherwise
 * @param SERIALIZABLE_META_TYPE_A SerializableType
 * @param SERIALIZABLE_META_TYPE_B SerializableType
 * @returns Boolean
 */
export type IntersectIsSerialized<
  SERIALIZABLE_META_TYPE_A extends SerializableType,
  SERIALIZABLE_META_TYPE_B extends SerializableType,
> = Or<
  IsSerialized<SERIALIZABLE_META_TYPE_A>,
  IsSerialized<SERIALIZABLE_META_TYPE_B>
>;

/**
 * Intersects the serialized values of two serializable meta-types
 * @param SERIALIZABLE_META_TYPE_A SerializableType
 * @param SERIALIZABLE_META_TYPE_B SerializableType
 * @returns Type
 */
export type IntersectDeserialized<
  SERIALIZABLE_META_TYPE_A extends SerializableType,
  SERIALIZABLE_META_TYPE_B extends SerializableType,
> = If<
  IsSerialized<SERIALIZABLE_META_TYPE_A>,
  If<
    IsSerialized<SERIALIZABLE_META_TYPE_B>,
    Deserialized<SERIALIZABLE_META_TYPE_A> &
      Deserialized<SERIALIZABLE_META_TYPE_B>,
    Deserialized<SERIALIZABLE_META_TYPE_A>
  >,
  If<
    IsSerialized<SERIALIZABLE_META_TYPE_B>,
    Deserialized<SERIALIZABLE_META_TYPE_B>
  >
>;
