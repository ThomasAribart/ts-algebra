import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { Const, ConstType } from "../const";
import { Enum, EnumType, EnumValues } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { Error, ErrorType } from "../error";
import { Type } from "../type";

import { $Intersect } from "./index";
import { IntersectConstToEnum } from "./const";
import { DistributeIntersection } from "./union";

export type IntersectEnum<A extends EnumType, B> = B extends Type
  ? B extends AnyType
    ? A
    : B extends NeverType
    ? Never
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
    : B extends ErrorType
    ? B
    : Error<"TODO">
  : Error<"TODO">;

type FilterUnintersecting<A extends EnumType, B> = Enum<
  RecurseOnEnumValues<EnumValues<A>, B>
>;

export type IntersectEnumToPrimitive<
  A extends EnumType,
  B extends PrimitiveType
> = FilterUnintersecting<A, B>;

export type IntersectEnumToArray<
  A extends EnumType,
  B extends ArrayType
> = FilterUnintersecting<A, B>;

export type IntersectEnumToTuple<
  A extends EnumType,
  B extends TupleType
> = FilterUnintersecting<A, B>;

export type IntersectEnumToObject<
  A extends EnumType,
  B extends ObjectType
> = FilterUnintersecting<A, B>;

type RecurseOnEnumValues<V, B> = V extends infer T
  ? $Intersect<Const<T>, B> extends Never
    ? never
    : T
  : never;
