import { IsObject } from "../../utils";

import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { Const, ConstType, ConstValue } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType, ObjectRequiredKeys, ObjectValue } from "../object";
import { UnionType } from "../union";
import { SerializableType, Type } from "../type";
import { Resolve } from "../resolve";

import { Intersect } from "./index";
import { DistributeIntersection } from "./union";
import { IntersectIsSerialized, IntersectDeserialized } from "./utils";

export type MergeConstToSerializable<
  A extends ConstType,
  B extends SerializableType
> = Const<
  ConstValue<A>,
  IntersectIsSerialized<A, B>,
  IntersectDeserialized<A, B>
>;

export type IntersectConst<A extends ConstType, B> = B extends Type
  ? B extends AnyType
    ? MergeConstToSerializable<A, B>
    : B extends NeverType
    ? Never
    : B extends ConstType
    ? CheckExtendsResolved<A, B>
    : B extends EnumType
    ? IntersectConstToEnum<A, B>
    : B extends PrimitiveType
    ? IntersectConstToPrimitive<A, B>
    : B extends ArrayType
    ? IntersectConstToArray<A, B>
    : B extends TupleType
    ? IntersectConstToTuple<A, B>
    : B extends ObjectType
    ? IntersectConstToObject<A, B>
    : B extends UnionType
    ? DistributeIntersection<B, A>
    : Never
  : Never;

type CheckExtendsResolved<
  A extends ConstType,
  B extends SerializableType
> = ConstValue<A> extends Resolve<B, { deserialize: false }>
  ? MergeConstToSerializable<A, B>
  : Never;

export type IntersectConstToEnum<
  A extends ConstType,
  B extends EnumType
> = CheckExtendsResolved<A, B>;

export type IntersectConstToPrimitive<
  A extends ConstType,
  B extends PrimitiveType
> = CheckExtendsResolved<A, B>;

export type IntersectConstToArray<
  A extends ConstType,
  B extends ArrayType
> = CheckExtendsResolved<A, B>;

export type IntersectConstToTuple<
  A extends ConstType,
  B extends TupleType
> = CheckExtendsResolved<A, B>;

export type IntersectConstToObject<
  A extends ConstType,
  B extends ObjectType
> = IsObject<ConstValue<A>> extends false
  ? Never
  : IntersectObjectConstToObject<A, B>;

type IntersectObjectConstToObject<
  A extends ConstType,
  B extends ObjectType,
  V = IntersectConstValuesToObjectValues<ConstValue<A>, B>
> = NeverKeys<V> extends never ? MergeConstToSerializable<A, B> : Never;

type IntersectConstValuesToObjectValues<V, B extends ObjectType> = {
  [key in Extract<keyof V | ObjectRequiredKeys<B>, string>]: key extends keyof V
    ? Intersect<Const<V[key]>, ObjectValue<B, key>>
    : Never;
};

type NeverKeys<O> = {
  [key in keyof O]: O[key] extends Never ? key : never;
}[keyof O];
