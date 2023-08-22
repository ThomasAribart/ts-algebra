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
  V,
  A extends EnumType,
  B extends SerializableType,
> = Enum<V, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;

export type IntersectEnum<A extends EnumType, B> = B extends Type
  ? B extends NeverType
    ? B
    : B extends AnyType
    ? MergeEnumValuesToSerializable<EnumValues<A>, A, B>
    : B extends ConstType
    ? IntersectConstToEnum<B, A>
    : B extends EnumType
    ? FilterUnintersecting<A, B>
    : B extends PrimitiveType
    ? IntersectEnumToPrimitive<A, B>
    : B extends ArrayType
    ? FilterUnintersecting<A, B>
    : B extends TupleType
    ? FilterUnintersecting<A, B>
    : B extends ObjectType
    ? FilterUnintersecting<A, B>
    : B extends UnionType
    ? DistributeIntersection<B, A>
    : Never
  : Never;

type FilterUnintersecting<
  A extends EnumType,
  B extends SerializableType,
> = MergeEnumValuesToSerializable<RecurseOnEnumValues<EnumValues<A>, B>, A, B>;

type RecurseOnEnumValues<V, B> = V extends infer T
  ? $Intersect<Const<T>, B> extends Never
    ? never
    : T
  : never;

export type IntersectEnumToPrimitive<
  A extends EnumType,
  B extends PrimitiveType,
> = FilterUnintersecting<A, B>;

export type IntersectEnumToArray<
  A extends EnumType,
  B extends ArrayType,
> = FilterUnintersecting<A, B>;

export type IntersectEnumToTuple<
  A extends EnumType,
  B extends TupleType,
> = FilterUnintersecting<A, B>;

export type IntersectEnumToObject<
  A extends EnumType,
  B extends ObjectType,
> = FilterUnintersecting<A, B>;
