import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { $Union, UnionType, UnionValues } from "../union";
import { Error, ErrorType } from "../error";
import { Type } from "../type";

import { $Intersect } from "./index";

export type IntersectUnion<A extends UnionType, B> = B extends Type
  ? B extends AnyType
    ? A
    : B extends NeverType
    ? Never
    : B extends ConstType
    ? DistributeIntersection<A, B>
    : B extends EnumType
    ? DistributeIntersection<A, B>
    : B extends PrimitiveType
    ? DistributeIntersection<A, B>
    : B extends ArrayType
    ? DistributeIntersection<A, B>
    : B extends TupleType
    ? DistributeIntersection<A, B>
    : B extends ObjectType
    ? DistributeIntersection<A, B>
    : B extends UnionType
    ? DistributeIntersection<A, B>
    : B extends ErrorType
    ? B
    : Error<"TODO">
  : Error<"TODO">;

export type DistributeIntersection<A extends UnionType, B> = $Union<
  RecurseOnUnionValues<UnionValues<A>, B>
>;

type RecurseOnUnionValues<V extends Type, B> = V extends infer T
  ? $Intersect<T, B>
  : never;
