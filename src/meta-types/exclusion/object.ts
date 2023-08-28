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
  IsOutsideOfExcludedScope,
  IsOutsideOfSourceScope,
  Propagate,
  SourceValue,
} from "./utils";

export type ExcludeFromObject<
  META_OBJECT extends ObjectType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_OBJECT
    : META_TYPE extends AnyType
    ? Never
    : META_TYPE extends ConstType
    ? ExcludeConstFromObject<META_OBJECT, META_TYPE>
    : META_TYPE extends EnumType
    ? ExcludeEnum<META_OBJECT, META_TYPE>
    : META_TYPE extends PrimitiveType
    ? META_OBJECT
    : META_TYPE extends ArrayType
    ? META_OBJECT
    : META_TYPE extends TupleType
    ? META_OBJECT
    : META_TYPE extends ObjectType
    ? ExcludeObjects<META_OBJECT, META_TYPE>
    : META_TYPE extends UnionType
    ? ExcludeUnion<META_OBJECT, META_TYPE>
    : Never
  : Never;

type ExcludeObjects<
  META_OBJECT_A extends ObjectType,
  META_OBJECT_B extends ObjectType,
  CROSSED_VALUES extends Record<string, CrossValueType> = ExcludeObjectValues<
    META_OBJECT_A,
    META_OBJECT_B
  >,
  REPRESENTABLE_KEYS extends string = RepresentableKeys<CROSSED_VALUES>,
  OPEN_PROPS_EXCLUSION = _Exclude<
    ObjectOpenProps<META_OBJECT_A>,
    ObjectOpenProps<META_OBJECT_B>
  >,
> = DoesObjectSizesMatch<
  META_OBJECT_A,
  META_OBJECT_B,
  CROSSED_VALUES
> extends true
  ? {
      moreThanTwo: META_OBJECT_A;
      onlyOne: PropagateExclusion<META_OBJECT_A, CROSSED_VALUES>;
      none: OmitOmittableKeys<META_OBJECT_A, CROSSED_VALUES>;
    }[And<
      IsObjectOpen<META_OBJECT_A>,
      Not<DoesExtend<OPEN_PROPS_EXCLUSION, NeverType>>
    > extends true
      ? "moreThanTwo"
      : GetUnionLength<REPRESENTABLE_KEYS>]
  : META_OBJECT_A;

type ExcludeObjectValues<
  META_OBJECT_A extends ObjectType,
  META_OBJECT_B extends ObjectType,
> = {
  [KEY in Extract<
    | keyof ObjectValues<META_OBJECT_A>
    | keyof ObjectValues<META_OBJECT_B>
    | ObjectRequiredKeys<META_OBJECT_A>
    | ObjectRequiredKeys<META_OBJECT_B>,
    string
  >]: CrossValue<
    ObjectValue<META_OBJECT_A, KEY>,
    IsPossibleIn<META_OBJECT_A, KEY>,
    IsRequiredIn<META_OBJECT_A, KEY>,
    ObjectValue<META_OBJECT_B, KEY>,
    IsPossibleIn<META_OBJECT_B, KEY>,
    IsRequiredIn<META_OBJECT_B, KEY>
  >;
};

// UTILS

type GetUnionLength<UNION> = If<
  IsNever<UNION>,
  "none",
  If<IsNever<UnionPop<UNION>>, "onlyOne", "moreThanTwo">
>;

type IsPossibleIn<META_OBJECT extends ObjectType, KEY extends string> = Or<
  DoesExtend<KEY, keyof ObjectValues<META_OBJECT>>,
  IsObjectOpen<META_OBJECT>
>;

type IsRequiredIn<
  META_OBJECT extends ObjectType,
  KEY extends string,
> = DoesExtend<KEY, ObjectRequiredKeys<META_OBJECT>>;

// SIZE CHECK

type DoesObjectSizesMatch<
  META_OBJECT_A extends ObjectType,
  META_OBJECT_B extends ObjectType,
  CROSSED_VALUES extends Record<string, CrossValueType>,
> = If<
  And<IsObjectOpen<META_OBJECT_A>, Not<IsObjectOpen<META_OBJECT_B>>>,
  false,
  And<
    IsExcludedSmallEnough<CROSSED_VALUES>,
    IsExcludedBigEnough<CROSSED_VALUES>
  >
>;

type IsExcludedSmallEnough<
  CROSSED_VALUES extends Record<string, CrossValueType>,
> = Not<
  DoesExtend<
    true,
    {
      [KEY in keyof CROSSED_VALUES]: IsOutsideOfSourceScope<
        CROSSED_VALUES[KEY]
      >;
    }[keyof CROSSED_VALUES]
  >
>;

type IsExcludedBigEnough<
  CROSSED_VALUES extends Record<string, CrossValueType>,
> = Not<
  DoesExtend<
    true,
    {
      [KEY in keyof CROSSED_VALUES]: IsOutsideOfExcludedScope<
        CROSSED_VALUES[KEY]
      >;
    }[keyof CROSSED_VALUES]
  >
>;

// PROPAGATION

type RepresentableKeys<CROSSED_VALUES extends Record<string, CrossValueType>> =
  {
    [KEY in Extract<keyof CROSSED_VALUES, string>]: ExclusionResult<
      CROSSED_VALUES[KEY]
    > extends NeverType
      ? never
      : KEY;
  }[Extract<keyof CROSSED_VALUES, string>];

type PropagateExclusion<
  META_OBJECT extends ObjectType,
  CROSSED_VALUES extends Record<string, CrossValueType>,
> = _Object<
  {
    [KEY in keyof CROSSED_VALUES]: Propagate<CROSSED_VALUES[KEY]>;
  },
  ObjectRequiredKeys<META_OBJECT>,
  ObjectOpenProps<META_OBJECT>,
  IsSerialized<META_OBJECT>,
  Deserialized<META_OBJECT>
>;

// OMITTABLE KEYS

type OmitOmittableKeys<
  META_OBJECT extends ObjectType,
  CROSSED_VALUES extends Record<string, CrossValueType>,
  OMITTABLE_KEYS extends string = OmittableKeys<CROSSED_VALUES>,
> = {
  moreThanTwo: META_OBJECT;
  onlyOne: _Object<
    {
      [KEY in keyof CROSSED_VALUES]: KEY extends OMITTABLE_KEYS
        ? Never
        : SourceValue<CROSSED_VALUES[KEY]>;
    },
    ObjectRequiredKeys<META_OBJECT>,
    ObjectOpenProps<META_OBJECT>,
    IsSerialized<META_OBJECT>,
    Deserialized<META_OBJECT>
  >;
  none: Never;
}[GetUnionLength<OMITTABLE_KEYS>];

type OmittableKeys<CROSSED_VALUES extends Record<string, CrossValueType>> = {
  [KEY in Extract<keyof CROSSED_VALUES, string>]: IsOmittable<
    CROSSED_VALUES[KEY]
  > extends true
    ? KEY
    : never;
}[Extract<keyof CROSSED_VALUES, string>];

// CONST

type ExcludeConstFromObject<
  META_OBJECT extends ObjectType,
  META_CONST extends ConstType,
  CONST_VALUE = ConstValue<META_CONST>,
> = If<
  IsObject<CONST_VALUE>,
  _$Exclude<
    META_OBJECT,
    _Object<
      {
        [KEY in Extract<keyof CONST_VALUE, string>]: Const<CONST_VALUE[KEY]>;
      },
      Extract<keyof CONST_VALUE, string>,
      Never,
      IsSerialized<META_CONST>,
      Deserialized<META_CONST>
    >
  >,
  META_OBJECT
>;
