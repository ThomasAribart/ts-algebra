import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { _$Array, ArrayType, ArrayValues } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { Type } from "../type";

import { Intersect } from "./index";
import { IntersectConstToArray } from "./const";
import { IntersectEnumToArray } from "./enum";
import { IntersectTupleToArray } from "./tuple";
import { DistributeIntersection } from "./union";

export type IntersectArray<A extends ArrayType, B> = B extends Type
  ? B extends AnyType
    ? A
    : B extends NeverType
    ? Never
    : B extends ConstType
    ? IntersectConstToArray<B, A>
    : B extends EnumType
    ? IntersectEnumToArray<B, A>
    : B extends PrimitiveType
    ? Never
    : B extends ArrayType
    ? IntersectArrays<A, B>
    : B extends TupleType
    ? IntersectTupleToArray<B, A>
    : B extends ObjectType
    ? Never
    : B extends UnionType
    ? DistributeIntersection<B, A>
    : Never
  : Never;

type IntersectArrays<A extends ArrayType, B extends ArrayType> = _$Array<
  Intersect<ArrayValues<A>, ArrayValues<B>>
>;
