import type { SerializableType } from "./type";

/**
 * Given a serializable meta-type, return `true` if it is serialized, `false` otherwise
 * @param SERIALIZABLE_META_TYPE SerializableType
 * @returns Boolean
 */
export type IsSerialized<SERIALIZABLE_META_TYPE extends SerializableType> =
  SERIALIZABLE_META_TYPE["isSerialized"];

/**
 * Return the deserialized type of serializable meta-type
 * @param SERIALIZABLE_META_TYPE SerializableType
 * @returns Boolean
 */
export type Deserialized<SERIALIZABLE_META_TYPE extends SerializableType> =
  SERIALIZABLE_META_TYPE["deserialized"];
