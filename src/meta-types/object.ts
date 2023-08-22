import type { And, DeepMergeUnsafe, DoesExtend, If, Not } from "~/utils";

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
 * @param REQUIRED string
 * @param OPEN_PROPS MetaType
 * @param IS_SERIALIZED Boolean
 * @param DESERIALIZED Type
 */
export type _Object<
  // ☝️ Prefixed with _ to not confuse with native TS Object
  VALUES extends Record<string, Type> = {},
  REQUIRED extends string = never,
  OPEN_PROPS extends Type = Never,
  IS_SERIALIZED extends boolean = false,
  DESERIALIZED = never,
> = _$Object<VALUES, REQUIRED, OPEN_PROPS, IS_SERIALIZED, DESERIALIZED>;

/**
 * Defines an `Object` meta-type (without type constraints)
 * @param VALUES Record<string, MetaType>
 * @param REQUIRED string
 * @param OPEN_PROPS MetaType
 * @param IS_SERIALIZED Boolean
 * @param DESERIALIZED Type
 */
export type _$Object<
  // ☝️ Prefixed with _ to not confuse with native TS Object
  VALUES = {},
  REQUIRED = never,
  OPEN_PROPS = Never,
  IS_SERIALIZED = false,
  DESERIALIZED = never,
> = DoesExtend<
  true,
  {
    [KEY in Extract<REQUIRED, string>]: KEY extends keyof VALUES
      ? DoesExtend<VALUES[KEY], NeverType>
      : DoesExtend<OPEN_PROPS, NeverType>;
  }[Extract<REQUIRED, string>]
> extends true
  ? Never
  : {
      type: ObjectTypeId;
      values: VALUES;
      required: REQUIRED;
      isOpen: Not<DoesExtend<OPEN_PROPS, NeverType>>;
      openProps: OPEN_PROPS;
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
  isSerialized: boolean;
  deserialized: unknown;
};

export type ObjectValues<META_OBJECT extends ObjectType> =
  META_OBJECT["values"];

export type ObjectValue<
  META_OBJECT extends ObjectType,
  KEY extends string,
> = KEY extends keyof ObjectValues<META_OBJECT>
  ? ObjectValues<META_OBJECT>[KEY]
  : IsObjectOpen<META_OBJECT> extends true
  ? ObjectOpenProps<META_OBJECT>
  : Never;

export type ObjectRequiredKeys<META_OBJECT extends ObjectType> =
  META_OBJECT["required"];

export type IsObjectOpen<META_OBJECT extends ObjectType> =
  META_OBJECT["isOpen"];

export type ObjectOpenProps<META_OBJECT extends ObjectType> =
  META_OBJECT["openProps"];

type IsObjectEmpty<META_OBJECT extends ObjectType> = DoesExtend<
  Extract<keyof ObjectValues<META_OBJECT>, keyof ObjectValues<META_OBJECT>>,
  never
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
    IsObjectOpen<META_OBJECT> extends true
      ? IsObjectEmpty<META_OBJECT> extends true
        ? { [KEY: string]: Resolve<ObjectOpenProps<META_OBJECT>, OPTIONS> }
        : { [KEY: string]: Resolve<Any, OPTIONS> }
      : {},
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
