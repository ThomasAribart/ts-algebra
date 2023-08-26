import type { And, DoesExtend, If, Not } from "~/utils";

import type { Never, NeverType } from "./never";
import type { Resolve, ResolveOptions } from "./resolve";
import type { Type } from "./type";
import type { Deserialized, IsSerialized } from "./utils";

/**
 * Type id of the `Tuple` meta-type
 */
export type TupleTypeId = "tuple";

/**
 * Defines a `Tuple` meta-type
 * @param VALUES MetaType[]
 * @param OPEN_PROPS MetaType
 * @param IS_SERIALIZED Boolean
 * @param DESERIALIZED Type
 */
export type Tuple<
  VALUES extends Type[],
  OPEN_PROPS extends Type = Never,
  IS_SERIALIZED extends boolean = false,
  DESERIALIZED = never,
> = $Tuple<VALUES, OPEN_PROPS, IS_SERIALIZED, DESERIALIZED>;

/**
 * Defines a `Tuple` meta-type (without type constraints)
 * @param VALUES MetaType[]
 * @param OPEN_PROPS MetaType
 * @param IS_SERIALIZED Boolean
 * @param DESERIALIZED Type
 */
export type $Tuple<
  VALUES,
  OPEN_PROPS = Never,
  IS_SERIALIZED = false,
  DESERIALIZED = never,
> = IsAnyValueNever<VALUES> extends true
  ? Never
  : {
      type: TupleTypeId;
      values: VALUES;
      isOpen: Not<DoesExtend<OPEN_PROPS, NeverType>>;
      openProps: OPEN_PROPS;
      isSerialized: IS_SERIALIZED;
      deserialized: DESERIALIZED;
    };

/**
 * Return `true` if tuple of meta-types contains the `Never` meta-type
 * @param TUPLE MetaType[]
 * @returns Boolean
 */
type IsAnyValueNever<TUPLE> = TUPLE extends [
  infer TUPLE_HEAD,
  ...infer TUPLE_TAIL,
]
  ? TUPLE_HEAD extends NeverType
    ? true
    : IsAnyValueNever<TUPLE_TAIL>
  : false;

/**
 * Any `Tuple` meta-type
 */
export type TupleType = {
  type: TupleTypeId;
  values: Type[];
  isOpen: boolean;
  openProps: Type;
  isSerialized: boolean;
  deserialized: unknown;
};

/**
 * Return the meta-types of a `Tuple` meta-type values
 * @param META_TUPLE TupleType
 * @returns MetaType[]
 */
export type TupleValues<META_TUPLE extends TupleType> = META_TUPLE["values"];

/**
 * Return `true` if the provided `Tuple` meta-type allows additional items, `false` otherwise
 * @param META_TUPLE TupleType
 * @returns Boolean
 */
export type IsTupleOpen<META_TUPLE extends TupleType> = META_TUPLE["isOpen"];

/**
 * Return a `Tuple` meta-type additional items meta-type
 * @param META_TUPLE TupleType
 * @returns MetaType
 */
export type TupleOpenProps<META_TUPLE extends TupleType> =
  META_TUPLE["openProps"];

/**
 * Resolves a `Tuple` meta-type to its encapsulated type
 * @param META_TUPLE TupleType
 * @param OPTIONS ResolveOptions
 * @returns Type
 */
export type ResolveTuple<
  META_TUPLE extends TupleType,
  OPTIONS extends ResolveOptions,
> = If<
  And<OPTIONS["deserialize"], IsSerialized<META_TUPLE>>,
  Deserialized<META_TUPLE>,
  If<
    IsTupleOpen<META_TUPLE>,
    [
      ...RecurseOnTuple<TupleValues<META_TUPLE>, OPTIONS>,
      ...Resolve<TupleOpenProps<META_TUPLE>, OPTIONS>[],
    ],
    RecurseOnTuple<TupleValues<META_TUPLE>, OPTIONS>
  >
>;

/**
 * Recursively resolves the items of a `Tuple` meta-type to their encapsulated types
 * @param VALUES MetaType[]
 * @param OPTIONS ResolveOptions
 * @returns Type[]
 */
type RecurseOnTuple<
  VALUES extends Type[],
  OPTIONS extends ResolveOptions,
  RESULT extends unknown[] = [],
> = VALUES extends [infer VALUES_HEAD, ...infer VALUES_TAIL]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    VALUES_HEAD extends Type
    ? VALUES_TAIL extends Type[]
      ? RecurseOnTuple<
          VALUES_TAIL,
          OPTIONS,
          [...RESULT, Resolve<VALUES_HEAD, OPTIONS>]
        >
      : never
    : never
  : RESULT;
