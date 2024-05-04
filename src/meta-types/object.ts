import type {
  And,
  DeepMergeUnsafe,
  DoesExtend,
  If,
  IsNever,
  Not,
} from "~/utils";

import type { Any } from "./any";
import type { Never, NeverType } from "./never";
import type { Resolve, ResolveOptions } from "./resolve";
import type { Type } from "./type";
import type { Deserialized, IsSerialized } from "./utils";

/**
 * Type id of the `Object` meta-type
 */
export type ObjectTypeId = "object";

/**
 * Defines an `Object` meta-type
 * @param VALUES Record<string, MetaType>
 * @param REQUIRED_KEYS string
 * @param OPEN_PROPS MetaType
 * @param IS_SERIALIZED Boolean
 * @param DESERIALIZED Type
 */
export type _Object<
  // ☝️ Prefixed with _ to not confuse with native TS Object
  VALUES extends Record<string, Type> = {},
  REQUIRED_KEYS extends string = never,
  OPEN_PROPS extends Type = Never,
  CLOSE_ON_RESOLVE extends boolean = false,
  IS_SERIALIZED extends boolean = false,
  DESERIALIZED = never,
> = _$Object<
  VALUES,
  REQUIRED_KEYS,
  OPEN_PROPS,
  CLOSE_ON_RESOLVE,
  IS_SERIALIZED,
  DESERIALIZED
>;

/**
 * Defines an `Object` meta-type (without type constraints)
 * @param VALUES Record<string, MetaType>
 * @param REQUIRED_KEYS string
 * @param OPEN_PROPS MetaType
 * @param CLOSE_ON_RESOLVE Boolean
 * @param IS_SERIALIZED Boolean
 * @param DESERIALIZED Type
 */
export type _$Object<
  // ☝️ Prefixed with _ to not confuse with native TS Object
  VALUES = {},
  REQUIRED_KEYS = never,
  OPEN_PROPS = Never,
  CLOSE_ON_RESOLVE = false,
  IS_SERIALIZED = false,
  DESERIALIZED = never,
> = DoesExtend<
  true,
  {
    [KEY in Extract<REQUIRED_KEYS, string>]: KEY extends keyof VALUES
      ? DoesExtend<VALUES[KEY], NeverType>
      : DoesExtend<OPEN_PROPS, NeverType>;
  }[Extract<REQUIRED_KEYS, string>]
> extends true
  ? Never
  : {
      type: ObjectTypeId;
      values: VALUES;
      required: REQUIRED_KEYS;
      isOpen: Not<DoesExtend<OPEN_PROPS, NeverType>>;
      openProps: OPEN_PROPS;
      closeOnResolve: CLOSE_ON_RESOLVE;
      isSerialized: IS_SERIALIZED;
      deserialized: DESERIALIZED;
    };

/**
 * Any `Object` meta-type
 */
export type ObjectType = {
  type: ObjectTypeId;
  values: Record<string, Type>;
  required: string;
  isOpen: boolean;
  openProps: Type;
  closeOnResolve: boolean;
  isSerialized: boolean;
  deserialized: unknown;
};

/**
 * Return the meta-types of an `Object` meta-type values
 * @param META_OBJECT ObjectType
 * @returns Record<string, MetaType>
 */
export type ObjectValues<META_OBJECT extends ObjectType> =
  META_OBJECT["values"];

/**
 * Return the value of an `Object` meta-type at a provided key (possibly `Never`)
 * @param META_OBJECT ObjectType
 * @param KEY String
 * @returns MetaType
 */
export type ObjectValue<
  META_OBJECT extends ObjectType,
  KEY extends string,
> = KEY extends keyof ObjectValues<META_OBJECT>
  ? ObjectValues<META_OBJECT>[KEY]
  : IsObjectOpen<META_OBJECT> extends true
  ? ObjectOpenProps<META_OBJECT>
  : Never;

/**
 * Return the required keys of an `Object` meta-type
 * @param META_OBJECT ObjectType
 * @returns String
 */
export type ObjectRequiredKeys<META_OBJECT extends ObjectType> =
  META_OBJECT["required"];

/**
 * Return `true` if the provided `Object` meta-type allows additional properties, `false` otherwise
 * @param META_OBJECT ObjectType
 * @returns Boolean
 */
export type IsObjectOpen<META_OBJECT extends ObjectType> =
  META_OBJECT["isOpen"];

/**
 * Return an `Object` meta-type additional properties meta-type
 * @param META_OBJECT ObjectType
 * @returns MetaType
 */
export type ObjectOpenProps<META_OBJECT extends ObjectType> =
  META_OBJECT["openProps"];

/**
 * Return `true` if the provided `Object` meta-type is to be resolved as a closed object
 * @param META_OBJECT ObjectType
 * @returns Boolean
 */
export type IsObjectClosedOnResolve<META_OBJECT extends ObjectType> =
  META_OBJECT["closeOnResolve"];

/**
 * Return `true` if object meta-type values are empty
 * @param META_OBJECT ObjectType
 * @returns Boolean
 */
type IsObjectEmpty<META_OBJECT extends ObjectType> = IsNever<
  keyof ObjectValues<META_OBJECT>
>;

/**
 * Resolves an `Object` meta-type to its encapsulated type
 * @param META_OBJECT ObjectType
 * @param OPTIONS ResolveOptions
 * @returns Type
 */
export type ResolveObject<
  META_OBJECT extends ObjectType,
  OPTIONS extends ResolveOptions,
> = If<
  And<OPTIONS["deserialize"], IsSerialized<META_OBJECT>>,
  Deserialized<META_OBJECT>,
  DeepMergeUnsafe<
    If<
      And<IsObjectOpen<META_OBJECT>, Not<IsObjectClosedOnResolve<META_OBJECT>>>,
      If<
        IsObjectEmpty<META_OBJECT>,
        { [KEY: string]: Resolve<ObjectOpenProps<META_OBJECT>, OPTIONS> },
        { [KEY: string]: Resolve<Any, OPTIONS> }
      >,
      {}
    >,
    DeepMergeUnsafe<
      {
        [KEY in Exclude<
          keyof ObjectValues<META_OBJECT>,
          ObjectRequiredKeys<META_OBJECT>
        >]?: Resolve<ObjectValues<META_OBJECT>[KEY], OPTIONS>;
      },
      {
        [KEY in ObjectRequiredKeys<META_OBJECT>]: KEY extends keyof ObjectValues<META_OBJECT>
          ? Resolve<ObjectValues<META_OBJECT>[KEY], OPTIONS>
          : Resolve<Any, OPTIONS>;
      }
    >
  >
>;
