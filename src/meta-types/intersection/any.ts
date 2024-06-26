import type { Any, AnyType } from "../any";
import type { ArrayType, ArrayValues } from "../array";
import type { ConstType } from "../const";
import type { EnumType, EnumValues } from "../enum";
import type { Never, NeverType } from "../never";
import type {
  IsObjectClosedOnResolve,
  ObjectOpenProps,
  ObjectRequiredKeys,
  ObjectType,
  ObjectValues,
} from "../object";
import type { PrimitiveType } from "../primitive";
import type { TupleOpenProps, TupleType, TupleValues } from "../tuple";
import type { Type } from "../type";
import type { UnionType } from "../union";
import type { IntersectArraySerializationParams } from "./array";
import type { IntersectConstSerializationParams } from "./const";
import type { IntersectEnumSerializationParams } from "./enum";
import type { IntersectObjectSerializationParams } from "./object";
import type { IntersectPrimitiveSerializationParams } from "./primitive";
import type { IntersectTupleSerializationParams } from "./tuple";
import type { DistributeIntersection } from "./union";
import type { IntersectDeserialized, IntersectIsSerialized } from "./utils";

/**
 * Intersects an `Any` meta-type with any other meta-type
 * @param META_ANY AnyType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
export type IntersectAny<
  META_ANY extends AnyType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_TYPE
    : META_TYPE extends AnyType
    ? Any<
        IntersectIsSerialized<META_ANY, META_TYPE>,
        IntersectDeserialized<META_ANY, META_TYPE>
      >
    : META_TYPE extends ConstType
    ? IntersectConstSerializationParams<META_TYPE, META_ANY>
    : META_TYPE extends EnumType
    ? IntersectEnumSerializationParams<
        EnumValues<META_TYPE>,
        META_TYPE,
        META_ANY
      >
    : META_TYPE extends PrimitiveType
    ? IntersectPrimitiveSerializationParams<META_TYPE, META_ANY>
    : META_TYPE extends ArrayType
    ? IntersectArraySerializationParams<
        ArrayValues<META_TYPE>,
        META_TYPE,
        META_ANY
      >
    : META_TYPE extends TupleType
    ? IntersectTupleSerializationParams<
        TupleValues<META_TYPE>,
        TupleOpenProps<META_TYPE>,
        META_TYPE,
        META_ANY
      >
    : META_TYPE extends ObjectType
    ? IntersectObjectSerializationParams<
        ObjectValues<META_TYPE>,
        ObjectRequiredKeys<META_TYPE>,
        ObjectOpenProps<META_TYPE>,
        IsObjectClosedOnResolve<META_TYPE>,
        META_TYPE,
        META_ANY
      >
    : META_TYPE extends UnionType
    ? DistributeIntersection<META_TYPE, META_ANY>
    : Never
  : Never;
