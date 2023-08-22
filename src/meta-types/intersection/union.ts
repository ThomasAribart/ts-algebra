import type { AnyType } from "../any";
import type { ArrayType } from "../array";
import type { ConstType } from "../const";
import type { EnumType } from "../enum";
import type { Never, NeverType } from "../never";
import type { ObjectType } from "../object";
import type { PrimitiveType } from "../primitive";
import type { TupleType } from "../tuple";
import type { Type } from "../type";
import type { $Union, UnionType, UnionValues } from "../union";
import type { $Intersect } from "./index";

export type IntersectUnion<A extends UnionType, B> = B extends Type
  ? B extends NeverType
    ? B
    : B extends AnyType
    ? A
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
    : Never
  : Never;

export type DistributeIntersection<A extends UnionType, B> = $Union<
  RecurseOnUnionValues<UnionValues<A>, B>
>;

type RecurseOnUnionValues<V extends Type, B> = V extends infer T
  ? $Intersect<T, B>
  : never;
