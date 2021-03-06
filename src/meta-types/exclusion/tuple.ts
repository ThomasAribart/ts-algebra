import { A, L } from "ts-toolbelt";

import { And, DoesExtend, Not, If } from "../../utils";

import { Never, NeverType } from "../never";
import { AnyType } from "../any";
import { Const, ConstType, ConstValue } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayValues, ArrayType } from "../array";
import {
  Tuple,
  $Tuple,
  TupleType,
  TupleValues,
  IsTupleOpen,
  TupleOpenProps,
} from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { Type } from "../type";
import { Deserialized, IsSerialized } from "../utils";

import { _Exclude } from "./index";
import { ExcludeEnum } from "./enum";
import { ExcludeUnion } from "./union";
import {
  CrossValue,
  CrossValueType,
  OriginValue,
  IsOutsideOfOriginScope,
  IsOutsideOfSubstractedScope,
  Propagate,
  IsOmittable,
  ExclusionResult,
} from "./utils";

export type ExcludeFromTuple<A extends TupleType, B> = B extends Type
  ? B extends NeverType
    ? A
    : B extends AnyType
    ? Never
    : B extends ConstType
    ? ExcludeConst<A, B>
    : B extends EnumType
    ? ExcludeEnum<A, B>
    : B extends PrimitiveType
    ? A
    : B extends ArrayType
    ? ExcludeArray<A, B>
    : B extends TupleType
    ? ExcludeTuples<A, B>
    : B extends ObjectType
    ? A
    : B extends UnionType
    ? ExcludeUnion<A, B>
    : Never
  : Never;

type ExcludeArray<A extends TupleType, B extends ArrayType> = ExcludeTuples<
  A,
  Tuple<[], ArrayValues<B>, IsSerialized<B>, Deserialized<B>>
>;

type ExcludeTuples<
  A extends TupleType,
  B extends TupleType,
  C extends CrossValueType[] = CrossTupleValues<
    TupleValues<A>,
    TupleValues<B>,
    IsTupleOpen<A>,
    IsTupleOpen<B>,
    TupleOpenProps<A>,
    TupleOpenProps<B>
  >,
  N extends CrossValueType[] = NonNeverItems<C>,
  P = _Exclude<TupleOpenProps<A>, TupleOpenProps<B>>,
  I = Not<DoesExtend<P, NeverType>>
> = DoesTupleSizesMatch<A, B, C> extends true
  ? {
      moreThanTwo: A;
      onlyOne: $Tuple<
        PropagateExclusion<C>,
        TupleOpenProps<A>,
        IsSerialized<A>,
        Deserialized<A>
      >;
      none: OmitOmittableItems<A, C>;
    }[And<IsTupleOpen<A>, I> extends true ? "moreThanTwo" : GetTupleLength<N>]
  : A;

type CrossTupleValues<
  V1 extends Type[],
  V2 extends Type[],
  O1 extends boolean,
  O2 extends boolean,
  P1 extends Type,
  P2 extends Type,
  C extends CrossValueType[] = []
> = {
  stop: L.Reverse<C>;
  continue1: CrossTupleValues<
    L.Tail<V1>,
    [],
    O1,
    O2,
    P1,
    P2,
    L.Prepend<C, CrossValue<L.Head<V1>, true, true, P2, O2, false>>
  >;
  continue2: CrossTupleValues<
    [],
    L.Tail<V2>,
    O1,
    O2,
    P1,
    P2,
    L.Prepend<C, CrossValue<P1, O1, false, L.Head<V2>, true, true>>
  >;
  continueBoth: CrossTupleValues<
    L.Tail<V1>,
    L.Tail<V2>,
    O1,
    O2,
    P1,
    P2,
    L.Prepend<C, CrossValue<L.Head<V1>, true, true, L.Head<V2>, true, true>>
  >;
}[V1 extends [any, ...any[]]
  ? V2 extends [any, ...any[]]
    ? "continueBoth"
    : "continue1"
  : V2 extends [any, ...any[]]
  ? "continue2"
  : "stop"];

// UTILS

type GetTupleLength<T extends any[], R extends any[] = L.Tail<T>> = If<
  A.Equals<T, []>,
  "none",
  If<A.Equals<R, []>, "onlyOne", "moreThanTwo">
>;

// SIZE CHECK

type DoesTupleSizesMatch<
  S extends TupleType,
  E extends TupleType,
  C extends CrossValueType[]
> = And<IsTupleOpen<S>, Not<IsTupleOpen<E>>> extends true
  ? false
  : And<IsSubstractedSmallEnough<C>, IsSubstractedBigEnough<C>>;

type IsSubstractedSmallEnough<C extends CrossValueType[]> = {
  stop: true;
  continue: IsOutsideOfOriginScope<L.Head<C>> extends true
    ? false
    : IsSubstractedSmallEnough<L.Tail<C>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];

type IsSubstractedBigEnough<C extends CrossValueType[]> = {
  stop: true;
  continue: IsOutsideOfSubstractedScope<L.Head<C>> extends true
    ? false
    : IsSubstractedBigEnough<L.Tail<C>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];

// PROPAGATION

type NonNeverItems<
  C extends CrossValueType[],
  R extends CrossValueType[] = []
> = {
  stop: R;
  continue: ExclusionResult<L.Head<C>> extends NeverType
    ? NonNeverItems<L.Tail<C>, R>
    : NonNeverItems<L.Tail<C>, L.Prepend<R, L.Head<C>>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];

type PropagateExclusion<C extends CrossValueType[], R extends any[] = []> = {
  stop: L.Reverse<R>;
  continue: PropagateExclusion<L.Tail<C>, L.Prepend<R, Propagate<L.Head<C>>>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];

// OMITTABLE ITEMS

type OmitOmittableItems<
  S extends TupleType,
  C extends CrossValueType[],
  I extends CrossValueType[] = OmittableItems<C>
> = {
  moreThanTwo: S;
  onlyOne: $Tuple<
    RequiredTupleValues<C>,
    Never,
    IsSerialized<S>,
    Deserialized<S>
  >;
  none: Never;
}[GetTupleLength<I>];

type OmittableItems<
  C extends CrossValueType[],
  R extends CrossValueType[] = []
> = {
  stop: R;
  continue: IsOmittable<L.Head<C>> extends true
    ? OmittableItems<L.Tail<C>, L.Prepend<R, L.Head<C>>>
    : OmittableItems<L.Tail<C>, R>;
}[C extends [any, ...any[]] ? "continue" : "stop"];

type RequiredTupleValues<C extends CrossValueType[], R extends Type[] = []> = {
  stop: L.Reverse<R>;
  continue: IsOmittable<L.Head<C>> extends true
    ? L.Reverse<R>
    : RequiredTupleValues<L.Tail<C>, L.Prepend<R, OriginValue<L.Head<C>>>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];

// CONST

type ExcludeConst<
  A extends TupleType,
  B extends ConstType,
  V = ConstValue<B>
> = V extends any[]
  ? _Exclude<
      A,
      $Tuple<ExtractConstValues<V>, Never, IsSerialized<B>, Deserialized<B>>
    >
  : A;

type ExtractConstValues<V extends any[], R extends any[] = []> = {
  stop: L.Reverse<R>;
  continue: ExtractConstValues<L.Tail<V>, L.Prepend<R, Const<L.Head<V>>>>;
}[V extends [any, ...any[]] ? "continue" : "stop"];
