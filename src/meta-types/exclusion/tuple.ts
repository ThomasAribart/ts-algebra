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
  ExclusionResult,
  IsOmittable,
  IsOutsideOfExcludedScope,
  IsOutsideOfSourceScope,
  PropagateExclusion,
  SourceValue,
  ValueExclusionResult,
  ValueExclusionResultType,
} from "./utils";

/**
 * Excludes from a `Tuple` meta-type any other meta-type
 * @param META_TUPLE TupleType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
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

/**
 * Excludes from a `Tuple` meta-type an `Array` meta-type
 * @param META_TUPLE TupleType
 * @param META_ARRAY ArrayType
 * @returns MetaType
 */
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

/**
 * Excludes from a `Tuple` meta-type another `Tuple` meta-type
 * @param META_TUPLE_A TupleType
 * @param META_TUPLE_B TupleType
 * @returns MetaType
 */
type ExcludeTuples<
  META_TUPLE_A extends TupleType,
  META_TUPLE_B extends TupleType,
  VALUE_EXCLUSION_RESULTS extends ValueExclusionResultType[] = ExcludeTupleValues<
    TupleValues<META_TUPLE_A>,
    TupleValues<META_TUPLE_B>,
    IsTupleOpen<META_TUPLE_A>,
    IsTupleOpen<META_TUPLE_B>,
    TupleOpenProps<META_TUPLE_A>,
    TupleOpenProps<META_TUPLE_B>
  >,
  REPRESENTABLE_VALUE_EXCLUSION_RESULTS extends ValueExclusionResultType[] = RepresentableExcludedValues<VALUE_EXCLUSION_RESULTS>,
  EXCLUDED_OPEN_PROPS = _Exclude<
    TupleOpenProps<META_TUPLE_A>,
    TupleOpenProps<META_TUPLE_B>
  >,
  IS_OPEN_PROPS_EXCLUSION_REPRESENTABLE = Not<
    DoesExtend<EXCLUDED_OPEN_PROPS, NeverType>
  >,
> = If<
  DoesTupleSizesMatch<META_TUPLE_A, META_TUPLE_B, VALUE_EXCLUSION_RESULTS>,
  {
    moreThanTwo: META_TUPLE_A;
    onlyOne: $Tuple<
      PropagateExclusions<VALUE_EXCLUSION_RESULTS>,
      TupleOpenProps<META_TUPLE_A>,
      IsSerialized<META_TUPLE_A>,
      Deserialized<META_TUPLE_A>
    >;
    none: OmitOmittableExcludedItems<META_TUPLE_A, VALUE_EXCLUSION_RESULTS>;
  }[And<
    IsTupleOpen<META_TUPLE_A>,
    IS_OPEN_PROPS_EXCLUSION_REPRESENTABLE
  > extends true
    ? "moreThanTwo"
    : GetTupleLength<REPRESENTABLE_VALUE_EXCLUSION_RESULTS>],
  META_TUPLE_A
>;

/**
 * Given two `Tuple` meta-types, provide a tuple of item-to-item exclusion results. Will extend to the largest tuple size and use additional items if needed.
 * @param META_TUPLE_A_VALUES MetaType[]
 * @param META_TUPLE_B_VALUES MetaType[]
 * @param IS_META_TUPLE_A_OPEN Boolean
 * @param IS_META_TUPLE_B_OPEN Boolean
 * @param META_TUPLE_A_OPEN_PROPS MetaType
 * @param META_TUPLE_B_OPEN_PROPS MetaType
 * @returns ValueExclusionResult[]
 */
type ExcludeTupleValues<
  META_TUPLE_A_VALUES extends Type[],
  META_TUPLE_B_VALUES extends Type[],
  IS_META_TUPLE_A_OPEN extends boolean,
  IS_META_TUPLE_B_OPEN extends boolean,
  META_TUPLE_A_OPEN_PROPS extends Type,
  META_TUPLE_B_OPEN_PROPS extends Type,
  VALUE_EXCLUSION_RESULTS extends ValueExclusionResultType[] = [],
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
            ? ExcludeTupleValues<
                META_TUPLE_A_VALUES_TAIL,
                META_TUPLE_B_VALUES_TAIL,
                IS_META_TUPLE_A_OPEN,
                IS_META_TUPLE_B_OPEN,
                META_TUPLE_A_OPEN_PROPS,
                META_TUPLE_B_OPEN_PROPS,
                [
                  ...VALUE_EXCLUSION_RESULTS,
                  ValueExclusionResult<
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
        : ExcludeTupleValues<
            META_TUPLE_A_VALUES_TAIL,
            [],
            IS_META_TUPLE_A_OPEN,
            IS_META_TUPLE_B_OPEN,
            META_TUPLE_A_OPEN_PROPS,
            META_TUPLE_B_OPEN_PROPS,
            [
              ...VALUE_EXCLUSION_RESULTS,
              ValueExclusionResult<
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
      ? ExcludeTupleValues<
          [],
          META_TUPLE_B_VALUES_TAIL,
          IS_META_TUPLE_A_OPEN,
          IS_META_TUPLE_B_OPEN,
          META_TUPLE_A_OPEN_PROPS,
          META_TUPLE_B_OPEN_PROPS,
          [
            ...VALUE_EXCLUSION_RESULTS,
            ValueExclusionResult<
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
  : VALUE_EXCLUSION_RESULTS;

// UTILS

/**
 * Returns `"none"` if tuple is empty, `"onlyOne"` if it contains one item, `"moreThanTwo"` otherwise
 * @param ANY_TUPLE Type[]
 * @returns `"none" | "onlyOne" | "moreThanTwo"`
 */
type GetTupleLength<
  ANY_TUPLE extends unknown[],
  TAIL extends unknown[] = Tail<ANY_TUPLE>,
> = If<
  DoesExtend<ANY_TUPLE, []>,
  "none",
  If<DoesExtend<TAIL, []>, "onlyOne", "moreThanTwo">
>;

// SIZE CHECK

/**
 * Returns `true` if the excluded meta-tuple size matches the source meta-tuple enough to make the exclusion relevant (i.e. return something else that the source meta-tuple), `false` otherwise.
 *
 * To do this, we first check if source is open and excluded is closed. In this case, sizes don't match (excluded is too small).
 *
 * If not, either source and excluded are both open, either source is closed. In both case:
 * - If an item is not allowed in source but required in excluded, sizes don't match (excluded is too large)
 * - If an item is required in source but not allowed in excluded, sizes don't match (excluded is too small)
 * @param META_TUPLE_A TupleType
 * @param META_TUPLE_B TupleType
 * @param VALUE_EXCLUSION_RESULTS ValueExclusionResult[]
 * @returns Boolean
 */
type DoesTupleSizesMatch<
  META_TUPLE_A extends TupleType,
  META_TUPLE_B extends TupleType,
  VALUE_EXCLUSION_RESULTS extends ValueExclusionResultType[],
> = If<
  And<IsTupleOpen<META_TUPLE_A>, Not<IsTupleOpen<META_TUPLE_B>>>,
  false,
  And<
    IsExcludedSmallEnough<VALUE_EXCLUSION_RESULTS>,
    IsExcludedBigEnough<VALUE_EXCLUSION_RESULTS>
  >
>;

/**
 * Given a item-to-item exclusion results tuple, returns `false` if one item is not allowed in source but required in excluded, `true` otherwise.
 * @param VALUE_EXCLUSION_RESULTS Record<string, ValueExclusionResult>
 * @returns Boolean
 */
type IsExcludedSmallEnough<
  VALUE_EXCLUSION_RESULTS extends ValueExclusionResultType[],
> = VALUE_EXCLUSION_RESULTS extends [
  infer VALUE_EXCLUSION_RESULTS_HEAD,
  ...infer VALUE_EXCLUSION_RESULTS_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    VALUE_EXCLUSION_RESULTS_HEAD extends ValueExclusionResultType
    ? VALUE_EXCLUSION_RESULTS_TAIL extends ValueExclusionResultType[]
      ? If<
          IsOutsideOfSourceScope<VALUE_EXCLUSION_RESULTS_HEAD>,
          false,
          IsExcludedSmallEnough<VALUE_EXCLUSION_RESULTS_TAIL>
        >
      : never
    : never
  : true;

/**
 * Given a item-to-item exclusion results tuple, returns `false` if one item is required in source but not allowed in excluded, `true` otherwise.
 * @param VALUE_EXCLUSION_RESULTS Record<string, ValueExclusionResult>
 * @returns Boolean
 */
type IsExcludedBigEnough<
  VALUE_EXCLUSION_RESULTS extends ValueExclusionResultType[],
> = VALUE_EXCLUSION_RESULTS extends [
  infer VALUE_EXCLUSION_RESULTS_HEAD,
  ...infer VALUE_EXCLUSION_RESULTS_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    VALUE_EXCLUSION_RESULTS_HEAD extends ValueExclusionResultType
    ? VALUE_EXCLUSION_RESULTS_TAIL extends ValueExclusionResultType[]
      ? If<
          IsOutsideOfExcludedScope<VALUE_EXCLUSION_RESULTS_HEAD>,
          false,
          IsExcludedBigEnough<VALUE_EXCLUSION_RESULTS_TAIL>
        >
      : never
    : never
  : true;

// PROPAGATION

/**
 * Given a item-to-item exclusion results tuple, filters the exclusion results that are representable (i.e. value exclusion is not the `Never` meta-type).
 * @param VALUE_EXCLUSION_RESULTS ValueExclusionResult[]
 * @returns ValueExclusionResult[]
 */
type RepresentableExcludedValues<
  VALUE_EXCLUSION_RESULTS extends ValueExclusionResultType[],
  REPRESENTABLE_VALUE_EXCLUSION_RESULTS extends ValueExclusionResultType[] = [],
> = VALUE_EXCLUSION_RESULTS extends [
  infer VALUE_EXCLUSION_RESULTS_HEAD,
  ...infer VALUE_EXCLUSION_RESULTS_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    VALUE_EXCLUSION_RESULTS_HEAD extends ValueExclusionResultType
    ? VALUE_EXCLUSION_RESULTS_TAIL extends ValueExclusionResultType[]
      ? ExclusionResult<VALUE_EXCLUSION_RESULTS_HEAD> extends NeverType
        ? RepresentableExcludedValues<
            VALUE_EXCLUSION_RESULTS_TAIL,
            REPRESENTABLE_VALUE_EXCLUSION_RESULTS
          >
        : RepresentableExcludedValues<
            VALUE_EXCLUSION_RESULTS_TAIL,
            [
              ...REPRESENTABLE_VALUE_EXCLUSION_RESULTS,
              VALUE_EXCLUSION_RESULTS_HEAD,
            ]
          >
      : never
    : never
  : REPRESENTABLE_VALUE_EXCLUSION_RESULTS;

/**
 * Given a item-to-item exclusion results tuple, returns the values of the propagated exclusion.
 * @param VALUE_EXCLUSION_RESULTS ValueExclusionResult[]
 * @returns MetaType[]
 */
type PropagateExclusions<
  VALUE_EXCLUSION_RESULTS extends ValueExclusionResultType[],
  RESULT extends unknown[] = [],
> = VALUE_EXCLUSION_RESULTS extends [
  infer VALUE_EXCLUSION_RESULTS_HEAD,
  ...infer VALUE_EXCLUSION_RESULTS_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    VALUE_EXCLUSION_RESULTS_HEAD extends ValueExclusionResultType
    ? VALUE_EXCLUSION_RESULTS_TAIL extends ValueExclusionResultType[]
      ? PropagateExclusions<
          VALUE_EXCLUSION_RESULTS_TAIL,
          [...RESULT, PropagateExclusion<VALUE_EXCLUSION_RESULTS_HEAD>]
        >
      : never
    : never
  : RESULT;

// OMITTABLE ITEMS

/**
 * Excludes two `Tuple` meta-types by omitting certain items from the source meta-tuple
 *
 * The process is the following:
 * - If two items or more are omittable, the source is returned untouched
 * - If only one item is omittable, then it can only be the first additional item: Source is returned closed (no additional items)
 * - If no item is omittable, the `Never` meta-type is returned
 * @param META_TUPLE TupleType
 * @param ITEM_EXCLUSION_RESULTS ValueExclusionResultType[]
 * @returns MetaType
 */
type OmitOmittableExcludedItems<
  META_TUPLE extends TupleType,
  ITEM_EXCLUSION_RESULTS extends ValueExclusionResultType[],
  OMITTABLE_ITEM_EXCLUSION_RESULTS extends ValueExclusionResultType[] = OmittableExcludedItems<ITEM_EXCLUSION_RESULTS>,
  OMITTABLE_ITEMS_COUNT extends string = GetTupleLength<OMITTABLE_ITEM_EXCLUSION_RESULTS>,
> = OMITTABLE_ITEMS_COUNT extends "moreThanTwo"
  ? META_TUPLE
  : OMITTABLE_ITEMS_COUNT extends "onlyOne"
  ? $Tuple<
      RequiredExcludedItems<ITEM_EXCLUSION_RESULTS>,
      Never,
      IsSerialized<META_TUPLE>,
      Deserialized<META_TUPLE>
    >
  : Never;

/**
 * Filters the items of an item-to-item exclusion results tuple that can be omitted (i.e. not required in source but required in excluded)
 * @param ITEM_EXCLUSION_RESULTS ValueExclusionResult[]
 * @returns ValueExclusionResult[]
 */
type OmittableExcludedItems<
  ITEM_EXCLUSION_RESULTS extends ValueExclusionResultType[],
  RESULT extends ValueExclusionResultType[] = [],
> = ITEM_EXCLUSION_RESULTS extends [
  infer VALUE_EXCLUSION_RESULTS_HEAD,
  ...infer VALUE_EXCLUSION_RESULTS_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    VALUE_EXCLUSION_RESULTS_HEAD extends ValueExclusionResultType
    ? VALUE_EXCLUSION_RESULTS_TAIL extends ValueExclusionResultType[]
      ? If<
          IsOmittable<VALUE_EXCLUSION_RESULTS_HEAD>,
          OmittableExcludedItems<
            VALUE_EXCLUSION_RESULTS_TAIL,
            [...RESULT, VALUE_EXCLUSION_RESULTS_HEAD]
          >,
          OmittableExcludedItems<VALUE_EXCLUSION_RESULTS_TAIL, RESULT>
        >
      : never
    : never
  : RESULT;

/**
 * Filters the items of an item-to-item exclusion results tuple that are required (i.e. not omittable).
 *
 * Note that:
 * - The recursion is stopped when one omittable item is found (no need to go further, check usage context)
 * - The source values are returned
 * @param ITEM_EXCLUSION_RESULTS ValueExclusionResult[]
 * @returns MetaType[]
 */
type RequiredExcludedItems<
  ITEM_EXCLUSION_RESULTS extends ValueExclusionResultType[],
  RESULT extends Type[] = [],
> = ITEM_EXCLUSION_RESULTS extends [
  infer VALUE_EXCLUSION_RESULTS_HEAD,
  ...infer VALUE_EXCLUSION_RESULTS_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    VALUE_EXCLUSION_RESULTS_HEAD extends ValueExclusionResultType
    ? VALUE_EXCLUSION_RESULTS_TAIL extends ValueExclusionResultType[]
      ? IsOmittable<VALUE_EXCLUSION_RESULTS_HEAD> extends true
        ? RESULT
        : RequiredExcludedItems<
            VALUE_EXCLUSION_RESULTS_TAIL,
            [...RESULT, SourceValue<VALUE_EXCLUSION_RESULTS_HEAD>]
          >
      : never
    : never
  : RESULT;

// CONST

/**
 * Excludes from a `Tuple` meta-type a `Const` meta-type
 * @param META_TUPLE TupleType
 * @param META_CONST ConstType
 * @returns MetaType
 */
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

/**
 * Transforms an array const to a meta-tuple of meta-consts
 * @param CONST_VALUES Type[]
 * @returns MetaTuple
 */
type ExtractConstValues<
  CONST_VALUES extends unknown[],
  RESULT extends unknown[] = [],
> = CONST_VALUES extends [infer CONST_VALUES_HEAD, ...infer CONST_VALUES_TAIL]
  ? ExtractConstValues<CONST_VALUES_TAIL, [...RESULT, Const<CONST_VALUES_HEAD>]>
  : RESULT;
