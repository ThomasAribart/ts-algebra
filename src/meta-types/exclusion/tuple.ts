/* eslint-disable max-lines */
import type { And, DoesExtend, If, Not, Tail } from "~/utils";

import type { AnyType } from "../any";
import type { ArrayType, ArrayValues } from "../array";
import type { Const, ConstType, ConstValue } from "../const";
import type { EnumType } from "../enum";
import type { Never, NeverType } from "../never";
import type { ObjectType } from "../object";
import type { PrimitiveType } from "../primitive";
import type {
  $Tuple,
  IsTupleOpen,
  Tuple,
  TupleOpenProps,
  TupleType,
  TupleValues,
} from "../tuple";
import type { Type } from "../type";
import type { UnionType } from "../union";
import type { Deserialized, IsSerialized } from "../utils";
import type { ExcludeEnum } from "./enum";
import type { _Exclude } from "./index";
import type { ExcludeUnion } from "./union";
import type {
  CrossValue,
  CrossValueType,
  ExclusionResult,
  IsOmittable,
  IsOutsideOfOriginScope,
  IsOutsideOfSubstractedScope,
  OriginValue,
  Propagate,
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
  I = Not<DoesExtend<P, NeverType>>,
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
  C extends CrossValueType[] = [],
> = V1 extends [infer H1, ...infer T1]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H1 extends Type
    ? T1 extends Type[]
      ? V2 extends [infer H2, ...infer T2]
        ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
          H2 extends Type
          ? T2 extends Type[]
            ? CrossTupleValues<
                T1,
                T2,
                O1,
                O2,
                P1,
                P2,
                [...C, CrossValue<H1, true, true, H2, true, true>]
              >
            : never
          : never
        : CrossTupleValues<
            T1,
            [],
            O1,
            O2,
            P1,
            P2,
            [...C, CrossValue<H1, true, true, P2, O2, false>]
          >
      : never
    : never
  : V2 extends [infer H2, ...infer T2]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H2 extends Type
    ? T2 extends Type[]
      ? CrossTupleValues<
          [],
          T2,
          O1,
          O2,
          P1,
          P2,
          [...C, CrossValue<P1, O1, false, H2, true, true>]
        >
      : never
    : never
  : C;

// UTILS

type GetTupleLength<T extends unknown[], R extends unknown[] = Tail<T>> = If<
  DoesExtend<T, []>,
  "none",
  If<DoesExtend<R, []>, "onlyOne", "moreThanTwo">
>;

// SIZE CHECK

type DoesTupleSizesMatch<
  S extends TupleType,
  E extends TupleType,
  C extends CrossValueType[],
> = And<IsTupleOpen<S>, Not<IsTupleOpen<E>>> extends true
  ? false
  : And<IsSubstractedSmallEnough<C>, IsSubstractedBigEnough<C>>;

type IsSubstractedSmallEnough<C extends CrossValueType[]> = C extends [
  infer H,
  ...infer T,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends CrossValueType
    ? T extends CrossValueType[]
      ? IsOutsideOfOriginScope<H> extends true
        ? false
        : IsSubstractedSmallEnough<T>
      : never
    : never
  : true;

type IsSubstractedBigEnough<C extends CrossValueType[]> = C extends [
  infer H,
  ...infer T,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends CrossValueType
    ? T extends CrossValueType[]
      ? IsOutsideOfSubstractedScope<H> extends true
        ? false
        : IsSubstractedBigEnough<T>
      : never
    : never
  : true;

// PROPAGATION

type NonNeverItems<
  C extends CrossValueType[],
  R extends CrossValueType[] = [],
> = C extends [infer H, ...infer T]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends CrossValueType
    ? T extends CrossValueType[]
      ? ExclusionResult<H> extends NeverType
        ? NonNeverItems<T, R>
        : NonNeverItems<T, [...R, H]>
      : never
    : never
  : R;

type PropagateExclusion<
  C extends CrossValueType[],
  R extends unknown[] = [],
> = C extends [infer H, ...infer T]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends CrossValueType
    ? T extends CrossValueType[]
      ? PropagateExclusion<T, [...R, Propagate<H>]>
      : never
    : never
  : R;

// OMITTABLE ITEMS

type OmitOmittableItems<
  S extends TupleType,
  C extends CrossValueType[],
  I extends CrossValueType[] = OmittableItems<C>,
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
  R extends CrossValueType[] = [],
> = C extends [infer H, ...infer T]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends CrossValueType
    ? T extends CrossValueType[]
      ? IsOmittable<H> extends true
        ? OmittableItems<T, [...R, H]>
        : OmittableItems<T, R>
      : never
    : never
  : R;

type RequiredTupleValues<
  C extends CrossValueType[],
  R extends Type[] = [],
> = C extends [infer H, ...infer T]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends CrossValueType
    ? T extends CrossValueType[]
      ? IsOmittable<H> extends true
        ? R
        : RequiredTupleValues<T, [...R, OriginValue<H>]>
      : never
    : never
  : R;

// CONST

type ExcludeConst<
  A extends TupleType,
  B extends ConstType,
  V = ConstValue<B>,
> = V extends unknown[]
  ? _Exclude<
      A,
      $Tuple<ExtractConstValues<V>, Never, IsSerialized<B>, Deserialized<B>>
    >
  : A;

type ExtractConstValues<
  V extends unknown[],
  R extends unknown[] = [],
> = V extends [infer H, ...infer T]
  ? ExtractConstValues<T, [...R, Const<H>]>
  : R;
