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

export type IntersectUnion<
  META_UNION extends UnionType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_TYPE
    : META_TYPE extends AnyType
    ? META_UNION
    : META_TYPE extends ConstType
    ? DistributeIntersection<META_UNION, META_TYPE>
    : META_TYPE extends EnumType
    ? DistributeIntersection<META_UNION, META_TYPE>
    : META_TYPE extends PrimitiveType
    ? DistributeIntersection<META_UNION, META_TYPE>
    : META_TYPE extends ArrayType
    ? DistributeIntersection<META_UNION, META_TYPE>
    : META_TYPE extends TupleType
    ? DistributeIntersection<META_UNION, META_TYPE>
    : META_TYPE extends ObjectType
    ? DistributeIntersection<META_UNION, META_TYPE>
    : META_TYPE extends UnionType
    ? DistributeIntersection<META_UNION, META_TYPE>
    : Never
  : Never;

export type DistributeIntersection<
  META_UNION extends UnionType,
  META_TYPE,
> = $Union<RecurseOnUnionValues<UnionValues<META_UNION>, META_TYPE>>;

type RecurseOnUnionValues<
  VALUES extends Type,
  META_TYPE,
> = VALUES extends infer VALUE ? $Intersect<VALUE, META_TYPE> : never;
