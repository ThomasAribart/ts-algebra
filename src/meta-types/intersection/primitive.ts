import type { And, DoesExtend, If } from "~/utils";

import type { AnyType } from "../any";
import type { ArrayType } from "../array";
import type { ConstType } from "../const";
import type { EnumType } from "../enum";
import type { Never, NeverType } from "../never";
import type { ObjectType } from "../object";
import type { Primitive, PrimitiveType, PrimitiveValue } from "../primitive";
import type { TupleType } from "../tuple";
import type { SerializableType, Type } from "../type";
import type { UnionType } from "../union";
import type { IntersectConstToPrimitive } from "./const";
import type { IntersectEnumToPrimitive } from "./enum";
import type { DistributeIntersection } from "./union";
import type { IntersectDeserialized, IntersectIsSerialized } from "./utils";

/**
 * Intersects a `Primitive` meta-type deserialization parameters with those of another meta-type
 * @param META_PRIMITIVE PrimitiveType
 * @param SERIALIZABLE_META_TYPE SerializableType
 * @returns PrimitiveType
 */
export type IntersectPrimitiveSerializationParams<
  META_PRIMITIVE extends PrimitiveType,
  SERIALIZABLE_META_TYPE extends SerializableType,
> = Primitive<
  PrimitiveValue<META_PRIMITIVE>,
  IntersectIsSerialized<META_PRIMITIVE, SERIALIZABLE_META_TYPE>,
  IntersectDeserialized<META_PRIMITIVE, SERIALIZABLE_META_TYPE>
>;

/**
 * Intersects a `Primitive` meta-type with any other meta-type
 * @param META_PRIMITIVE PrimitiveType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
export type IntersectPrimitive<
  META_PRIMITIVE extends PrimitiveType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_TYPE
    : META_TYPE extends AnyType
    ? IntersectPrimitiveSerializationParams<META_PRIMITIVE, META_TYPE>
    : META_TYPE extends ConstType
    ? IntersectConstToPrimitive<META_TYPE, META_PRIMITIVE>
    : META_TYPE extends EnumType
    ? IntersectEnumToPrimitive<META_TYPE, META_PRIMITIVE>
    : META_TYPE extends PrimitiveType
    ? If<
        And<
          DoesExtend<PrimitiveValue<META_PRIMITIVE>, PrimitiveValue<META_TYPE>>,
          DoesExtend<PrimitiveValue<META_TYPE>, PrimitiveValue<META_PRIMITIVE>>
        >,
        IntersectPrimitiveSerializationParams<META_PRIMITIVE, META_TYPE>,
        Never
      >
    : META_TYPE extends ArrayType
    ? Never
    : META_TYPE extends TupleType
    ? Never
    : META_TYPE extends ObjectType
    ? Never
    : META_TYPE extends UnionType
    ? DistributeIntersection<META_TYPE, META_PRIMITIVE>
    : Never
  : Never;
