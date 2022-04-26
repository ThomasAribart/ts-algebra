import { L } from "ts-toolbelt";

import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType, ArrayValues } from "../array";
import {
  $Tuple,
  TupleType,
  TupleValues,
  IsTupleOpen,
  TupleOpenProps,
} from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { Type, SerializableType } from "../type";

import { Intersect, $Intersect } from "./index";
import { IntersectConstToTuple } from "./const";
import { IntersectEnumToTuple } from "./enum";
import { DistributeIntersection } from "./union";
import { IntersectDeserialized, IntersectIsSerialized } from "./utils";

export type MergeTuplePropsToSerializable<
  V extends Type[],
  P extends Type,
  A extends TupleType,
  B extends SerializableType
> = $MergeTuplePropsToSerializable<V, P, A, B>;

type $MergeTuplePropsToSerializable<
  V,
  P,
  A extends TupleType,
  B extends SerializableType
> = $Tuple<V, P, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;

export type IntersectTuple<A extends TupleType, B> = B extends AnyType
  ? MergeTuplePropsToSerializable<TupleValues<A>, TupleOpenProps<A>, A, B>
  : B extends NeverType
  ? B
  : B extends ConstType
  ? IntersectConstToTuple<B, A>
  : B extends EnumType
  ? IntersectEnumToTuple<B, A>
  : B extends PrimitiveType
  ? Never
  : B extends ArrayType
  ? IntersectTupleToArray<A, B>
  : B extends TupleType
  ? IntersectTuples<A, B>
  : B extends ObjectType
  ? Never
  : B extends UnionType
  ? DistributeIntersection<B, A>
  : Never;

export type IntersectTupleToArray<
  T extends TupleType,
  A extends ArrayType,
  V extends any[] = IntersectTupleToArrayValues<TupleValues<T>, ArrayValues<A>>,
  O = $Intersect<TupleOpenProps<T>, ArrayValues<A>>
> = $MergeTuplePropsToSerializable<V, O, T, A>;

type IntersectTupleToArrayValues<
  V extends Type[],
  T extends Type,
  R extends any[] = []
> = {
  stop: L.Reverse<R>;
  continue: IntersectTupleToArrayValues<
    L.Tail<V>,
    T,
    L.Prepend<R, Intersect<L.Head<V>, T>>
  >;
}[V extends [any, ...any[]] ? "continue" : "stop"];

type IntersectTuples<
  A extends TupleType,
  B extends TupleType,
  V extends any[] = IntersectTupleValues<
    TupleValues<A>,
    TupleValues<B>,
    IsTupleOpen<A>,
    IsTupleOpen<B>,
    TupleOpenProps<A>,
    TupleOpenProps<B>
  >,
  O = $Intersect<TupleOpenProps<A>, TupleOpenProps<B>>
> = $MergeTuplePropsToSerializable<V, O, A, B>;

type IntersectTupleValues<
  V1 extends Type[],
  V2 extends Type[],
  O1 extends boolean,
  O2 extends boolean,
  P1 extends Type,
  P2 extends Type,
  R extends any[] = []
> = {
  stop: L.Reverse<R>;
  continue1: IntersectTupleValues<
    L.Tail<V1>,
    V2,
    O1,
    O2,
    P1,
    P2,
    L.Prepend<R, O2 extends true ? Intersect<L.Head<V1>, P2> : Never>
  >;
  continue2: IntersectTupleValues<
    V1,
    L.Tail<V2>,
    O1,
    O2,
    P1,
    P2,
    L.Prepend<R, O1 extends true ? Intersect<L.Head<V2>, P1> : Never>
  >;
  continueBoth: IntersectTupleValues<
    L.Tail<V1>,
    L.Tail<V2>,
    O1,
    O2,
    P1,
    P2,
    L.Prepend<R, Intersect<L.Head<V1>, L.Head<V2>>>
  >;
}[V1 extends [any, ...any[]]
  ? V2 extends [any, ...any[]]
    ? "continueBoth"
    : "continue1"
  : V2 extends [any, ...any[]]
  ? "continue2"
  : "stop"];
