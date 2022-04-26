import { A, U } from "ts-toolbelt";

import { And, Or, Not, DoesExtend, IsObject, If } from "../../utils";

import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { Const, ConstType, ConstValue } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import {
  _Object,
  ObjectType,
  ObjectValues,
  ObjectValue,
  ObjectRequiredKeys,
  IsObjectOpen,
  ObjectOpenProps,
} from "../object";
import { UnionType } from "../union";
import { Type } from "../type";

import { _Exclude, _$Exclude } from "./index";
import { ExcludeEnum } from "./enum";
import { ExcludeUnion } from "./union";
import {
  CrossValue,
  SourceValue,
  ExclusionValue,
  IsOutsideOfSourceScope,
  IsOutsideOfExcludedScope,
  Propagate,
  IsOmittable,
  CrossValueType,
} from "./utils";

export type ExcludeFromObject<A extends ObjectType, B> = B extends Type
  ? B extends AnyType
    ? Never
    : B extends NeverType
    ? A
    : B extends ConstType
    ? ExcludeConstFromObject<A, B>
    : B extends EnumType
    ? ExcludeEnum<A, B>
    : B extends PrimitiveType | ArrayType | TupleType
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
  P = _Exclude<ObjectOpenProps<A>, ObjectOpenProps<B>>
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
  A.Equals<U, never>,
  "none",
  If<A.Equals<U.Pop<U>, never>, "onlyOne", "moreThanTwo">
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
  C extends Record<string, CrossValueType>
> = And<IsObjectOpen<A>, Not<IsObjectOpen<B>>> extends true
  ? false
  : And<IsExcludedSmallEnough<C>, IsExcludedBigEnough<C>>;

type IsExcludedSmallEnough<C extends Record<string, CrossValueType>> = Not<
  DoesExtend<
    true,
    {
      [key in keyof C]: IsOutsideOfSourceScope<C[key]>;
    }[keyof C]
  >
>;

type IsExcludedBigEnough<C extends Record<string, CrossValueType>> = Not<
  DoesExtend<
    true,
    {
      [key in keyof C]: IsOutsideOfExcludedScope<C[key]>;
    }[keyof C]
  >
>;

// PROPAGATION

type NonNeverKeys<C extends Record<string, CrossValueType>> = {
  [key in Extract<keyof C, string>]: ExclusionValue<C[key]> extends NeverType
    ? never
    : key;
}[Extract<keyof C, string>];

type PropagateExclusion<
  A extends ObjectType,
  C extends Record<string, CrossValueType>
> = _Object<
  {
    [key in keyof C]: Propagate<C[key]>;
  },
  ObjectRequiredKeys<A>,
  ObjectOpenProps<A>
>;

// OMITTABLE KEYS

type OmitOmittableKeys<
  A extends ObjectType,
  C extends Record<string, CrossValueType>,
  K extends string = OmittableKeys<C>
> = {
  moreThanTwo: A;
  onlyOne: _Object<
    {
      [key in keyof C]: key extends K ? Never : SourceValue<C[key]>;
    },
    ObjectRequiredKeys<A>,
    ObjectOpenProps<A>
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
  V = ConstValue<B>
> = IsObject<V> extends true
  ? _$Exclude<
      A,
      _Object<
        { [key in Extract<keyof V, string>]: Const<V[key]> },
        Extract<keyof V, string>,
        Never
      >
    >
  : A;
