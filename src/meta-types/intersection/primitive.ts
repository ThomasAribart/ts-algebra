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

export type MergePrimitiveToSerializable<
  A extends PrimitiveType,
  B extends SerializableType,
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
        And<
          DoesExtend<PrimitiveValue<A>, PrimitiveValue<B>>,
          DoesExtend<PrimitiveValue<B>, PrimitiveValue<A>>
        >,
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
