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
  IsObjectClosedOnResolve,
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
 * Excludes from an `Object` meta-type any other meta-type
 * @param META_OBJECT ObjectType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
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

/**
 * Excludes from an `Object` meta-type another `Object` meta-type
 * @param META_OBJECT_A ObjectType
 * @param META_OBJECT_B ObjectType
 * @returns MetaType
 */
type ExcludeObjects<
  META_OBJECT_A extends ObjectType,
  META_OBJECT_B extends ObjectType,
  VALUE_EXCLUSION_RESULTS extends Record<
    string,
    ValueExclusionResultType
  > = ExcludeObjectValues<META_OBJECT_A, META_OBJECT_B>,
  REPRESENTABLE_KEYS extends string = RepresentableKeys<VALUE_EXCLUSION_RESULTS>,
  OPEN_PROPS_EXCLUSION = _Exclude<
    ObjectOpenProps<META_OBJECT_A>,
    ObjectOpenProps<META_OBJECT_B>
  >,
> = DoesObjectSizesMatch<
  META_OBJECT_A,
  META_OBJECT_B,
  VALUE_EXCLUSION_RESULTS
> extends true
  ? {
      moreThanTwo: META_OBJECT_A;
      onlyOne: PropagateExclusions<META_OBJECT_A, VALUE_EXCLUSION_RESULTS>;
      none: OmitOmittableKeys<META_OBJECT_A, VALUE_EXCLUSION_RESULTS>;
    }[And<
      IsObjectOpen<META_OBJECT_A>,
      Not<DoesExtend<OPEN_PROPS_EXCLUSION, NeverType>>
    > extends true
      ? "moreThanTwo"
      : GetUnionLength<REPRESENTABLE_KEYS>]
  : META_OBJECT_A;

/**
 * Given two `Object` meta-types, provide an object of key-value to key-value exclusion results. Returned object keys will be the union of the two meta-objects' value keys plus required keys. Will use additional properties if needed.
 * @param META_OBJECT_A ObjectType
 * @param META_OBJECT_B ObjectType
 * @returns Record<string, ValueExclusionResult>
 */
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
  >]: ValueExclusionResult<
    ObjectValue<META_OBJECT_A, KEY>,
    IsAllowedIn<META_OBJECT_A, KEY>,
    IsRequiredIn<META_OBJECT_A, KEY>,
    ObjectValue<META_OBJECT_B, KEY>,
    IsAllowedIn<META_OBJECT_B, KEY>,
    IsRequiredIn<META_OBJECT_B, KEY>
  >;
};

// UTILS

/**
 * Returns `"none"` if union is empty, `"onlyOne"` if it contains one element, `"moreThanTwo"` otherwise
 * @param UNION Type
 * @returns `"none" | "onlyOne" | "moreThanTwo"`
 */
type GetUnionLength<UNION> = If<
  IsNever<UNION>,
  "none",
  If<IsNever<UnionPop<UNION>>, "onlyOne", "moreThanTwo">
>;

/**
 * Returns `true` if key is allowed in the meta-object, `false` otherwise
 * @param META_OBJECT ObjectType
 * @param KEY String
 * @returns Boolean
 */
type IsAllowedIn<META_OBJECT extends ObjectType, KEY extends string> = Or<
  DoesExtend<KEY, keyof ObjectValues<META_OBJECT>>,
  IsObjectOpen<META_OBJECT>
>;

/**
 * Returns `true` if key is required in the meta-object, `false` otherwise
 * @param META_OBJECT ObjectType
 * @param KEY String
 * @returns Boolean
 */
type IsRequiredIn<
  META_OBJECT extends ObjectType,
  KEY extends string,
> = DoesExtend<KEY, ObjectRequiredKeys<META_OBJECT>>;

// SIZE CHECK

/**
 * Returns `true` if the excluded meta-object size matches the source meta-object enough to make the exclusion relevant (i.e. return something else that the source meta-object), `false` otherwise.
 *
 * To do this, we first check if source is open and excluded is closed. In this case, sizes don't match (excluded is too small).
 *
 * If not, either source and excluded are both open, either source is closed. In both case:
 * - If a key is not allowed in source but required in excluded, sizes don't match (excluded is too large)
 * - If a key is required in source but not allowed in excluded, sizes don't match (excluded is too small)
 * @param META_OBJECT_A ObjectType
 * @param META_OBJECT_B ObjectType
 * @param VALUE_EXCLUSION_RESULTS Record<string, ValueExclusionResult>
 * @returns Boolean
 */
type DoesObjectSizesMatch<
  META_OBJECT_A extends ObjectType,
  META_OBJECT_B extends ObjectType,
  VALUE_EXCLUSION_RESULTS extends Record<string, ValueExclusionResultType>,
> = If<
  And<IsObjectOpen<META_OBJECT_A>, Not<IsObjectOpen<META_OBJECT_B>>>,
  false,
  And<
    IsExcludedSmallEnough<VALUE_EXCLUSION_RESULTS>,
    IsExcludedBigEnough<VALUE_EXCLUSION_RESULTS>
  >
>;

/**
 * Given a key-value to key-value exclusion results object, returns `false` if one key is not allowed in source but required in excluded, `true` otherwise.
 * @param VALUE_EXCLUSION_RESULTS Record<string, ValueExclusionResult>
 * @returns Boolean
 */
type IsExcludedSmallEnough<
  VALUE_EXCLUSION_RESULTS extends Record<string, ValueExclusionResultType>,
> = Not<
  DoesExtend<
    true,
    {
      [KEY in keyof VALUE_EXCLUSION_RESULTS]: IsOutsideOfSourceScope<
        VALUE_EXCLUSION_RESULTS[KEY]
      >;
    }[keyof VALUE_EXCLUSION_RESULTS]
  >
>;

/**
 * Given a key-value to key-value exclusion results object, returns `false` if one key is required in source but not allowed in excluded, `true` otherwise.
 * @param VALUE_EXCLUSION_RESULTS Record<string, ValueExclusionResult>
 * @returns Boolean
 */
type IsExcludedBigEnough<
  VALUE_EXCLUSION_RESULTS extends Record<string, ValueExclusionResultType>,
> = Not<
  DoesExtend<
    true,
    {
      [KEY in keyof VALUE_EXCLUSION_RESULTS]: IsOutsideOfExcludedScope<
        VALUE_EXCLUSION_RESULTS[KEY]
      >;
    }[keyof VALUE_EXCLUSION_RESULTS]
  >
>;

// PROPAGATION

/**
 * Given a key-value to key-value exclusion results object, returns the keys of its representable values (i.e. value exclusion is not the `Never` meta-type)
 * @param VALUE_EXCLUSION_RESULTS Record<string, ValueExclusionResult>
 * @returns string
 */
type RepresentableKeys<
  VALUE_EXCLUSION_RESULTS extends Record<string, ValueExclusionResultType>,
> = {
  [KEY in Extract<keyof VALUE_EXCLUSION_RESULTS, string>]: ExclusionResult<
    VALUE_EXCLUSION_RESULTS[KEY]
  > extends NeverType
    ? never
    : KEY;
}[Extract<keyof VALUE_EXCLUSION_RESULTS, string>];

/**
 * Given a source `Object` meta-type, and a key-value to key-value exclusion results object, returns the resulting exclusion by propagating it to each key-value.
 * @param META_OBJECT ObjectType
 * @param VALUE_EXCLUSION_RESULTS Record<string, ValueExclusionResult>
 * @returns ObjectType
 */
type PropagateExclusions<
  META_OBJECT extends ObjectType,
  VALUE_EXCLUSION_RESULTS extends Record<string, ValueExclusionResultType>,
> = _Object<
  {
    [KEY in keyof VALUE_EXCLUSION_RESULTS]: PropagateExclusion<
      VALUE_EXCLUSION_RESULTS[KEY]
    >;
  },
  ObjectRequiredKeys<META_OBJECT>,
  ObjectOpenProps<META_OBJECT>,
  IsObjectClosedOnResolve<META_OBJECT>,
  IsSerialized<META_OBJECT>,
  Deserialized<META_OBJECT>
>;

// OMITTABLE KEYS

/**
 * Excludes two `Object` meta-types by omitting certain keys from the source meta-object
 *
 * The process is the following:
 * - If two keys or more are omittable, the source is returned untouched
 * - If only one key is omittable, the source is returned with this key value overridden to the `Never` meta-type
 * - If no key is omittable, the `Never` meta-type is returned
 * @param META_OBJECT ObjectType
 * @param VALUE_EXCLUSION_RESULTS Record<string, ValueExclusionResult>
 * @returns MetaType
 */
type OmitOmittableKeys<
  META_OBJECT extends ObjectType,
  VALUE_EXCLUSION_RESULTS extends Record<string, ValueExclusionResultType>,
  OMITTABLE_KEYS extends string = OmittableKeys<VALUE_EXCLUSION_RESULTS>,
  OMITTABLE_KEYS_COUNT extends string = GetUnionLength<OMITTABLE_KEYS>,
> = OMITTABLE_KEYS_COUNT extends "moreThanTwo"
  ? META_OBJECT
  : OMITTABLE_KEYS_COUNT extends "onlyOne"
  ? _Object<
      {
        [KEY in keyof VALUE_EXCLUSION_RESULTS]: KEY extends OMITTABLE_KEYS
          ? Never
          : SourceValue<VALUE_EXCLUSION_RESULTS[KEY]>;
      },
      ObjectRequiredKeys<META_OBJECT>,
      ObjectOpenProps<META_OBJECT>,
      IsObjectClosedOnResolve<META_OBJECT>,
      IsSerialized<META_OBJECT>,
      Deserialized<META_OBJECT>
    >
  : Never;

/**
 * Returns the keys of a a value-to-value exclusion that can be omitted (i.e. not required in source but required in excluded)
 * @param VALUE_EXCLUSION_RESULTS Record<string, ValueExclusionResult>
 * @returns string
 */
type OmittableKeys<
  VALUE_EXCLUSION_RESULTS extends Record<string, ValueExclusionResultType>,
> = {
  [KEY in Extract<keyof VALUE_EXCLUSION_RESULTS, string>]: IsOmittable<
    VALUE_EXCLUSION_RESULTS[KEY]
  > extends true
    ? KEY
    : never;
}[Extract<keyof VALUE_EXCLUSION_RESULTS, string>];

// CONST

/**
 * Excludes from an `Object` meta-type a `Const` meta-type
 * @param META_OBJECT ObjectType
 * @param META_CONST ConstType
 * @returns MetaType
 */
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
      IsObjectClosedOnResolve<META_OBJECT>,
      IsSerialized<META_CONST>,
      Deserialized<META_CONST>
    >
  >,
  META_OBJECT
>;
