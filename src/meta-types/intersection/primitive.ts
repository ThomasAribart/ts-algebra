import { A } from "ts-toolbelt";

import { If } from "../../utils";

import { Never, NeverType } from "../never";
import { AnyType } from "../any";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveValue, PrimitiveType, Primitive } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { SerializableType, Type } from "../type";

import { IntersectConstToPrimitive } from "./const";
import { IntersectEnumToPrimitive } from "./enum";
import { DistributeIntersection } from "./union";
import { IntersectDeserialized, IntersectIsSerialized } from "./utils";

export type MergePrimitiveToSerializable<
  A extends PrimitiveType,
  B extends SerializableType
> = Primitive<
  PrimitiveValue<A>,
  IntersectIsSerialized<A, B>,
  IntersectDeserialized<A, B>
>;

export type IntersectPrimitive<A extends PrimitiveType, B> = B extends Type
  ? B extends NeverType
    ? B
    : B extends AnyType
    ? MergePrimitiveToSerializable<A, B>
    : B extends ConstType
    ? IntersectConstToPrimitive<B, A>
    : B extends EnumType
    ? IntersectEnumToPrimitive<B, A>
    : B extends PrimitiveType
    ? If<
        A.Equals<PrimitiveValue<A>, PrimitiveValue<B>>,
        MergePrimitiveToSerializable<A, B>,
        Never
      >
    : B extends ArrayType
    ? Never
    : B extends TupleType
    ? Never
    : B extends ObjectType
    ? Never
    : B extends UnionType
    ? DistributeIntersection<B, A>
    : Never
  : Never;
