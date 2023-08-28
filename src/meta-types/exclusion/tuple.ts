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
  IsOutsideOfExcludedScope,
  IsOutsideOfSourceScope,
  Propagate,
  SourceValue,
} from "./utils";

export type ExcludeFromTuple<
  META_TUPLE extends TupleType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_TUPLE
    : META_TYPE extends AnyType
    ? Never
    : META_TYPE extends ConstType
    ? ExcludeConst<META_TUPLE, META_TYPE>
    : META_TYPE extends EnumType
    ? ExcludeEnum<META_TUPLE, META_TYPE>
    : META_TYPE extends PrimitiveType
    ? META_TUPLE
    : META_TYPE extends ArrayType
    ? ExcludeArray<META_TUPLE, META_TYPE>
    : META_TYPE extends TupleType
    ? ExcludeTuples<META_TUPLE, META_TYPE>
    : META_TYPE extends ObjectType
    ? META_TUPLE
    : META_TYPE extends UnionType
    ? ExcludeUnion<META_TUPLE, META_TYPE>
    : Never
  : Never;

type ExcludeArray<
  META_TUPLE extends TupleType,
  META_ARRAY extends ArrayType,
> = ExcludeTuples<
  META_TUPLE,
  Tuple<
    [],
    ArrayValues<META_ARRAY>,
    IsSerialized<META_ARRAY>,
    Deserialized<META_ARRAY>
  >
>;

type ExcludeTuples<
  META_TUPLE_A extends TupleType,
  META_TUPLE_B extends TupleType,
  CROSSED_VALUES extends CrossValueType[] = CrossTupleValues<
    TupleValues<META_TUPLE_A>,
    TupleValues<META_TUPLE_B>,
    IsTupleOpen<META_TUPLE_A>,
    IsTupleOpen<META_TUPLE_B>,
    TupleOpenProps<META_TUPLE_A>,
    TupleOpenProps<META_TUPLE_B>
  >,
  REPRESENTABLE_CROSSED_VALUES extends CrossValueType[] = RepresentableCrossedValues<CROSSED_VALUES>,
  EXCLUDED_OPEN_PROPS = _Exclude<
    TupleOpenProps<META_TUPLE_A>,
    TupleOpenProps<META_TUPLE_B>
  >,
  IS_OPEN_PROPS_EXCLUSION_REPRESENTABLE = Not<
    DoesExtend<EXCLUDED_OPEN_PROPS, NeverType>
  >,
> = If<
  DoesTupleSizesMatch<META_TUPLE_A, META_TUPLE_B, CROSSED_VALUES>,
  {
    moreThanTwo: META_TUPLE_A;
    onlyOne: $Tuple<
      PropagateExclusion<CROSSED_VALUES>,
      TupleOpenProps<META_TUPLE_A>,
      IsSerialized<META_TUPLE_A>,
      Deserialized<META_TUPLE_A>
    >;
    none: OmitOmittableCrossedValues<META_TUPLE_A, CROSSED_VALUES>;
  }[And<
    IsTupleOpen<META_TUPLE_A>,
    IS_OPEN_PROPS_EXCLUSION_REPRESENTABLE
  > extends true
    ? "moreThanTwo"
    : GetTupleLength<REPRESENTABLE_CROSSED_VALUES>],
  META_TUPLE_A
>;

type CrossTupleValues<
  META_TUPLE_A_VALUES extends Type[],
  META_TUPLE_B_VALUES extends Type[],
  IS_META_TUPLE_A_OPEN extends boolean,
  IS_META_TUPLE_B_OPEN extends boolean,
  META_TUPLE_A_OPEN_PROPS extends Type,
  META_TUPLE_B_OPEN_PROPS extends Type,
  CROSSED_VALUES extends CrossValueType[] = [],
> = META_TUPLE_A_VALUES extends [
  infer META_TUPLE_A_VALUES_HEAD,
  ...infer META_TUPLE_A_VALUES_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    META_TUPLE_A_VALUES_HEAD extends Type
    ? META_TUPLE_A_VALUES_TAIL extends Type[]
      ? META_TUPLE_B_VALUES extends [
          infer META_TUPLE_B_VALUES_HEAD,
          ...infer META_TUPLE_B_VALUES_TAIL,
        ]
        ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
          META_TUPLE_B_VALUES_HEAD extends Type
          ? META_TUPLE_B_VALUES_TAIL extends Type[]
            ? CrossTupleValues<
                META_TUPLE_A_VALUES_TAIL,
                META_TUPLE_B_VALUES_TAIL,
                IS_META_TUPLE_A_OPEN,
                IS_META_TUPLE_B_OPEN,
                META_TUPLE_A_OPEN_PROPS,
                META_TUPLE_B_OPEN_PROPS,
                [
                  ...CROSSED_VALUES,
                  CrossValue<
                    META_TUPLE_A_VALUES_HEAD,
                    true,
                    true,
                    META_TUPLE_B_VALUES_HEAD,
                    true,
                    true
                  >,
                ]
              >
            : never
          : never
        : CrossTupleValues<
            META_TUPLE_A_VALUES_TAIL,
            [],
            IS_META_TUPLE_A_OPEN,
            IS_META_TUPLE_B_OPEN,
            META_TUPLE_A_OPEN_PROPS,
            META_TUPLE_B_OPEN_PROPS,
            [
              ...CROSSED_VALUES,
              CrossValue<
                META_TUPLE_A_VALUES_HEAD,
                true,
                true,
                META_TUPLE_B_OPEN_PROPS,
                IS_META_TUPLE_B_OPEN,
                false
              >,
            ]
          >
      : never
    : never
  : META_TUPLE_B_VALUES extends [
      infer META_TUPLE_B_VALUES_HEAD,
      ...infer META_TUPLE_B_VALUES_TAIL,
    ]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    META_TUPLE_B_VALUES_HEAD extends Type
    ? META_TUPLE_B_VALUES_TAIL extends Type[]
      ? CrossTupleValues<
          [],
          META_TUPLE_B_VALUES_TAIL,
          IS_META_TUPLE_A_OPEN,
          IS_META_TUPLE_B_OPEN,
          META_TUPLE_A_OPEN_PROPS,
          META_TUPLE_B_OPEN_PROPS,
          [
            ...CROSSED_VALUES,
            CrossValue<
              META_TUPLE_A_OPEN_PROPS,
              IS_META_TUPLE_A_OPEN,
              false,
              META_TUPLE_B_VALUES_HEAD,
              true,
              true
            >,
          ]
        >
      : never
    : never
  : CROSSED_VALUES;

// UTILS

type GetTupleLength<
  ANY_TUPLE extends unknown[],
  TAIL extends unknown[] = Tail<ANY_TUPLE>,
> = If<
  DoesExtend<ANY_TUPLE, []>,
  "none",
  If<DoesExtend<TAIL, []>, "onlyOne", "moreThanTwo">
>;

// SIZE CHECK

type DoesTupleSizesMatch<
  META_TUPLE_A extends TupleType,
  META_TUPLE_B extends TupleType,
  CROSSED_VALUES extends CrossValueType[],
> = If<
  And<IsTupleOpen<META_TUPLE_A>, Not<IsTupleOpen<META_TUPLE_B>>>,
  false,
  And<
    IsExcludedSmallEnough<CROSSED_VALUES>,
    IsExcludedBigEnough<CROSSED_VALUES>
  >
>;

type IsExcludedSmallEnough<CROSSED_VALUES extends CrossValueType[]> =
  CROSSED_VALUES extends [
    infer CROSSED_VALUES_HEAD,
    ...infer CROSSED_VALUES_TAIL,
  ]
    ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
      CROSSED_VALUES_HEAD extends CrossValueType
      ? CROSSED_VALUES_TAIL extends CrossValueType[]
        ? If<
            IsOutsideOfSourceScope<CROSSED_VALUES_HEAD>,
            false,
            IsExcludedSmallEnough<CROSSED_VALUES_TAIL>
          >
        : never
      : never
    : true;

type IsExcludedBigEnough<CROSSED_VALUES extends CrossValueType[]> =
  CROSSED_VALUES extends [
    infer CROSSED_VALUES_HEAD,
    ...infer CROSSED_VALUES_TAIL,
  ]
    ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
      CROSSED_VALUES_HEAD extends CrossValueType
      ? CROSSED_VALUES_TAIL extends CrossValueType[]
        ? If<
            IsOutsideOfExcludedScope<CROSSED_VALUES_HEAD>,
            false,
            IsExcludedBigEnough<CROSSED_VALUES_TAIL>
          >
        : never
      : never
    : true;

// PROPAGATION

type RepresentableCrossedValues<
  CROSSED_VALUES extends CrossValueType[],
  REPRESENTABLE_CROSSED_VALUES extends CrossValueType[] = [],
> = CROSSED_VALUES extends [
  infer CROSSED_VALUES_HEAD,
  ...infer CROSSED_VALUES_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    CROSSED_VALUES_HEAD extends CrossValueType
    ? CROSSED_VALUES_TAIL extends CrossValueType[]
      ? ExclusionResult<CROSSED_VALUES_HEAD> extends NeverType
        ? RepresentableCrossedValues<
            CROSSED_VALUES_TAIL,
            REPRESENTABLE_CROSSED_VALUES
          >
        : RepresentableCrossedValues<
            CROSSED_VALUES_TAIL,
            [...REPRESENTABLE_CROSSED_VALUES, CROSSED_VALUES_HEAD]
          >
      : never
    : never
  : REPRESENTABLE_CROSSED_VALUES;

type PropagateExclusion<
  CROSSED_VALUES extends CrossValueType[],
  RESULT extends unknown[] = [],
> = CROSSED_VALUES extends [
  infer CROSSED_VALUES_HEAD,
  ...infer CROSSED_VALUES_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    CROSSED_VALUES_HEAD extends CrossValueType
    ? CROSSED_VALUES_TAIL extends CrossValueType[]
      ? PropagateExclusion<
          CROSSED_VALUES_TAIL,
          [...RESULT, Propagate<CROSSED_VALUES_HEAD>]
        >
      : never
    : never
  : RESULT;

// OMITTABLE ITEMS

type OmitOmittableCrossedValues<
  META_TUPLE extends TupleType,
  CROSSED_VALUES extends CrossValueType[],
  OMITTABLE_CROSSED_VALUES extends CrossValueType[] = OmittableCrossedValues<CROSSED_VALUES>,
> = {
  moreThanTwo: META_TUPLE;
  onlyOne: $Tuple<
    RequiredCrossedValues<CROSSED_VALUES>,
    Never,
    IsSerialized<META_TUPLE>,
    Deserialized<META_TUPLE>
  >;
  none: Never;
}[GetTupleLength<OMITTABLE_CROSSED_VALUES>];

type OmittableCrossedValues<
  CROSSED_VALUES extends CrossValueType[],
  RESULT extends CrossValueType[] = [],
> = CROSSED_VALUES extends [
  infer CROSSED_VALUES_HEAD,
  ...infer CROSSED_VALUES_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    CROSSED_VALUES_HEAD extends CrossValueType
    ? CROSSED_VALUES_TAIL extends CrossValueType[]
      ? If<
          IsOmittable<CROSSED_VALUES_HEAD>,
          OmittableCrossedValues<
            CROSSED_VALUES_TAIL,
            [...RESULT, CROSSED_VALUES_HEAD]
          >,
          OmittableCrossedValues<CROSSED_VALUES_TAIL, RESULT>
        >
      : never
    : never
  : RESULT;

type RequiredCrossedValues<
  CROSSED_VALUES extends CrossValueType[],
  RESULT extends Type[] = [],
> = CROSSED_VALUES extends [
  infer CROSSED_VALUES_HEAD,
  ...infer CROSSED_VALUES_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    CROSSED_VALUES_HEAD extends CrossValueType
    ? CROSSED_VALUES_TAIL extends CrossValueType[]
      ? IsOmittable<CROSSED_VALUES_HEAD> extends true
        ? RESULT
        : RequiredCrossedValues<
            CROSSED_VALUES_TAIL,
            [...RESULT, SourceValue<CROSSED_VALUES_HEAD>]
          >
      : never
    : never
  : RESULT;

// CONST

type ExcludeConst<
  META_TUPLE extends TupleType,
  META_CONST extends ConstType,
  META_CONST_VALUE = ConstValue<META_CONST>,
> = META_CONST_VALUE extends unknown[]
  ? _Exclude<
      META_TUPLE,
      $Tuple<
        ExtractConstValues<META_CONST_VALUE>,
        Never,
        IsSerialized<META_CONST>,
        Deserialized<META_CONST>
      >
    >
  : META_TUPLE;

type ExtractConstValues<
  CONST_VALUES extends unknown[],
  RESULT extends unknown[] = [],
> = CONST_VALUES extends [infer CONST_VALUES_HEAD, ...infer CONST_VALUES_TAIL]
  ? ExtractConstValues<CONST_VALUES_TAIL, [...RESULT, Const<CONST_VALUES_HEAD>]>
  : RESULT;
