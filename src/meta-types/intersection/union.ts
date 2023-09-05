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

/**
 * Intersects a `Union` meta-type with any other meta-type
 * @param META_UNION UnionType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
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

/**
 * Recursively intersects a `Union` meta-type values to any other meta-type
 *
 * To do so, we create a union of all value intersections: `(A | B) & C = (A & C) | (B & C)`
 * @param META_UNION UnionType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
export type DistributeIntersection<
  META_UNION extends UnionType,
  META_TYPE,
> = $Union<
  UnionValues<META_UNION> extends infer UNION_VALUE
    ? $Intersect<UNION_VALUE, META_TYPE>
    : never
>;
