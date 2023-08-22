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

export type MergeArrayValuesToSerializable<
  V extends Type,
  A extends ArrayType,
  B extends SerializableType,
> = $MergeArrayValuesToSerializable<V, A, B>;

type $MergeArrayValuesToSerializable<
  V,
  A extends ArrayType,
  B extends SerializableType,
> = _$Array<V, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;

export type IntersectArray<A extends ArrayType, B> = B extends Type
  ? B extends NeverType
    ? B
    : B extends AnyType
    ? MergeArrayValuesToSerializable<ArrayValues<A>, A, B>
    : B extends ConstType
    ? IntersectConstToArray<B, A>
    : B extends EnumType
    ? IntersectEnumToArray<B, A>
    : B extends PrimitiveType
    ? Never
    : B extends ArrayType
    ? IntersectArrays<A, B>
    : B extends TupleType
    ? IntersectTupleToArray<B, A>
    : B extends ObjectType
    ? Never
    : B extends UnionType
    ? DistributeIntersection<B, A>
    : Never
  : Never;

type IntersectArrays<
  A extends ArrayType,
  B extends ArrayType,
> = $MergeArrayValuesToSerializable<
  Intersect<ArrayValues<A>, ArrayValues<B>>,
  A,
  B
>;
