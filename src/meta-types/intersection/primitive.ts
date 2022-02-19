import { A, B } from "ts-toolbelt";

import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveValue, PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { Error, ErrorType } from "../error";
import { Type } from "../type";

import { IntersectConstToPrimitive } from "./const";
import { IntersectEnumToPrimitive } from "./enum";
import { DistributeIntersection } from "./union";

export type IntersectPrimitive<A extends PrimitiveType, B> = B extends Type
  ? B extends AnyType
    ? A
    : B extends NeverType
    ? Never
    : B extends ConstType
    ? IntersectConstToPrimitive<B, A>
    : B extends EnumType
    ? IntersectEnumToPrimitive<B, A>
    : B extends PrimitiveType
    ? A.Equals<PrimitiveValue<A>, PrimitiveValue<B>> extends B.True
      ? A
      : Never
    : B extends ArrayType
    ? Never
    : B extends TupleType
    ? Never
    : B extends ObjectType
    ? Never
    : B extends UnionType
    ? DistributeIntersection<B, A>
    : B extends ErrorType
    ? B
    : Error<"TODO">
  : Error<"TODO">;
