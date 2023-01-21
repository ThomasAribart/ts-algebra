import { Never, NeverType } from "../never";
import { AnyType } from "../any";
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

export type IntersectTuple<A extends TupleType, B> = B extends NeverType
  ? B
  : B extends AnyType
  ? MergeTuplePropsToSerializable<TupleValues<A>, TupleOpenProps<A>, A, B>
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
> = V extends [infer H, ...infer Tl]
  ? H extends Type
    ? Tl extends Type[]
      ? IntersectTupleToArrayValues<Tl, T, [...R, Intersect<H, T>]>
      : never
    : never
  : R;

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
> = V1 extends [infer H1, ...infer T1]
  ? H1 extends Type
    ? T1 extends Type[]
      ? V2 extends [infer H2, ...infer T2]
        ? H2 extends Type
          ? T2 extends Type[]
            ? IntersectTupleValues<
                T1,
                T2,
                O1,
                O2,
                P1,
                P2,
                [...R, Intersect<H1, H2>]
              >
            : never
          : never
        : IntersectTupleValues<
            T1,
            V2,
            O1,
            O2,
            P1,
            P2,
            [...R, O2 extends true ? Intersect<H1, P2> : Never]
          >
      : never
    : never
  : V2 extends [infer H2, ...infer T2]
  ? H2 extends Type
    ? T2 extends Type[]
      ? IntersectTupleValues<
          V1,
          T2,
          O1,
          O2,
          P1,
          P2,
          [...R, O1 extends true ? Intersect<H2, P1> : Never]
        >
      : never
    : never
  : R;
