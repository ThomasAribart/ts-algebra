/* eslint-disable max-lines */
import type {
  And,
  DoesExtend,
  If,
  IsNever,
  IsObject,
  Not,
  Or,
  UnionPop,
} from "~/utils";

import type { AnyType } from "../any";
import type { ArrayType } from "../array";
import type { Const, ConstType, ConstValue } from "../const";
import type { EnumType } from "../enum";
import type { Never, NeverType } from "../never";
import type {
  _Object,
  IsObjectOpen,
  ObjectOpenProps,
  ObjectRequiredKeys,
  ObjectType,
  ObjectValue,
  ObjectValues,
} from "../object";
import type { PrimitiveType } from "../primitive";
import type { TupleType } from "../tuple";
import type { Type } from "../type";
import type { UnionType } from "../union";
import type { Deserialized, IsSerialized } from "../utils";
import type { ExcludeEnum } from "./enum";
import type { _$Exclude, _Exclude } from "./index";
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

export type ExcludeFromObject<A extends ObjectType, B> = B extends Type
  ? B extends NeverType
    ? A
    : B extends AnyType
    ? Never
    : B extends ConstType
    ? ExcludeConstFromObject<A, B>
    : B extends EnumType
    ? ExcludeEnum<A, B>
    : B extends PrimitiveType
    ? A
    : B extends ArrayType
    ? A
    : B extends TupleType
    ? A
    : B extends ObjectType
    ? ExcludeObjects<A, B>
    : B extends UnionType
    ? ExcludeUnion<A, B>
    : Never
  : Never;

type ExcludeObjects<
  A extends ObjectType,
  B extends ObjectType,
  C extends Record<string, CrossValueType> = ExcludeObjectValues<A, B>,
  R extends string = NonNeverKeys<C>,
  P = _Exclude<ObjectOpenProps<A>, ObjectOpenProps<B>>,
> = DoesObjectSizesMatch<A, B, C> extends true
  ? {
      moreThanTwo: A;
      onlyOne: PropagateExclusion<A, C>;
      none: OmitOmittableKeys<A, C>;
    }[And<IsObjectOpen<A>, Not<DoesExtend<P, NeverType>>> extends true
      ? "moreThanTwo"
      : GetUnionLength<R>]
  : A;

type ExcludeObjectValues<A extends ObjectType, B extends ObjectType> = {
  [key in Extract<
    | keyof ObjectValues<A>
    | keyof ObjectValues<B>
    | ObjectRequiredKeys<A>
    | ObjectRequiredKeys<B>,
    string
  >]: CrossValue<
    ObjectValue<A, key>,
    IsPossibleIn<A, key>,
    IsRequiredIn<A, key>,
    ObjectValue<B, key>,
    IsPossibleIn<B, key>,
    IsRequiredIn<B, key>
  >;
};

// UTILS

type GetUnionLength<U> = If<
  IsNever<U>,
  "none",
  If<IsNever<UnionPop<U>>, "onlyOne", "moreThanTwo">
>;

type IsPossibleIn<O extends ObjectType, K extends string> = Or<
  DoesExtend<K, keyof ObjectValues<O>>,
  IsObjectOpen<O>
>;

type IsRequiredIn<O extends ObjectType, K extends string> = DoesExtend<
  K,
  ObjectRequiredKeys<O>
>;

// SIZE CHECK

type DoesObjectSizesMatch<
  A extends ObjectType,
  B extends ObjectType,
  C extends Record<string, CrossValueType>,
> = And<IsObjectOpen<A>, Not<IsObjectOpen<B>>> extends true
  ? false
  : And<IsSubstractedSmallEnough<C>, IsSubstractedBigEnough<C>>;

type IsSubstractedSmallEnough<C extends Record<string, CrossValueType>> = Not<
  DoesExtend<
    true,
    {
      [key in keyof C]: IsOutsideOfOriginScope<C[key]>;
    }[keyof C]
  >
>;

type IsSubstractedBigEnough<C extends Record<string, CrossValueType>> = Not<
  DoesExtend<
    true,
    {
      [key in keyof C]: IsOutsideOfSubstractedScope<C[key]>;
    }[keyof C]
  >
>;

// PROPAGATION

type NonNeverKeys<C extends Record<string, CrossValueType>> = {
  [key in Extract<keyof C, string>]: ExclusionResult<C[key]> extends NeverType
    ? never
    : key;
}[Extract<keyof C, string>];

type PropagateExclusion<
  A extends ObjectType,
  C extends Record<string, CrossValueType>,
> = _Object<
  {
    [key in keyof C]: Propagate<C[key]>;
  },
  ObjectRequiredKeys<A>,
  ObjectOpenProps<A>,
  IsSerialized<A>,
  Deserialized<A>
>;

// OMITTABLE KEYS

type OmitOmittableKeys<
  A extends ObjectType,
  C extends Record<string, CrossValueType>,
  K extends string = OmittableKeys<C>,
> = {
  moreThanTwo: A;
  onlyOne: _Object<
    {
      [key in keyof C]: key extends K ? Never : OriginValue<C[key]>;
    },
    ObjectRequiredKeys<A>,
    ObjectOpenProps<A>,
    IsSerialized<A>,
    Deserialized<A>
  >;
  none: Never;
}[GetUnionLength<K>];

type OmittableKeys<C extends Record<string, CrossValueType>> = {
  [key in Extract<keyof C, string>]: IsOmittable<C[key]> extends true
    ? key
    : never;
}[Extract<keyof C, string>];

// CONST

type ExcludeConstFromObject<
  A extends ObjectType,
  B extends ConstType,
  V = ConstValue<B>,
> = IsObject<V> extends true
  ? _$Exclude<
      A,
      _Object<
        { [key in Extract<keyof V, string>]: Const<V[key]> },
        Extract<keyof V, string>,
        Never,
        IsSerialized<B>,
        Deserialized<B>
      >
    >
  : A;
