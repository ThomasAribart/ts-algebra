import { DoesExtend, DeepMergeUnsafe } from "../utils";

import { Any } from "./any";
import { Never, NeverType } from "./never";
import { Type } from "./type";
import { $Resolve } from "./resolve";

export type ObjectTypeId = "object";

// Prefixed with _ to not confuse with native TS Object
export type _Object<
  V extends Record<string, Type> = {},
  R extends string = never,
  O extends boolean = false,
  P extends Type = Any
> = _$Object<V, R, O, P>;

export type _$Object<V = {}, R = never, O = false, P = Any> = DoesExtend<
  true,
  {
    [key in Extract<R, string>]: key extends keyof V
      ? DoesExtend<V[key], NeverType>
      : O extends true
      ? DoesExtend<P, NeverType>
      : true;
  }[Extract<R, string>]
> extends true
  ? Never
  : {
      type: ObjectTypeId;
      values: V;
      required: R;
      isOpen: O;
      openProps: P;
    };

export type ObjectType = {
  type: ObjectTypeId;
  values: Record<string, Type>;
  required: string;
  isOpen: boolean;
  openProps: Type;
};

export type ObjectValues<O extends ObjectType> = O["values"];

export type ObjectValue<
  O extends ObjectType,
  K extends string
> = K extends keyof ObjectValues<O>
  ? ObjectValues<O>[K]
  : IsObjectOpen<O> extends true
  ? ObjectOpenProps<O>
  : Never;

export type ObjectRequiredKeys<O extends ObjectType> = O["required"];

export type IsObjectOpen<O extends ObjectType> = O["isOpen"];

export type ObjectOpenProps<O extends ObjectType> = O["openProps"];

type IsObjectEmpty<O extends ObjectType> = DoesExtend<
  Extract<keyof ObjectValues<O>, keyof ObjectValues<O>>,
  never
>;

export type ResolveObject<O extends ObjectType> = DeepMergeUnsafe<
  IsObjectOpen<O> extends true
    ? IsObjectEmpty<O> extends true
      ? { [key: string]: $Resolve<ObjectOpenProps<O>> }
      : { [key: string]: $Resolve<Any> }
    : {},
  DeepMergeUnsafe<
    {
      [key in Exclude<keyof ObjectValues<O>, ObjectRequiredKeys<O>>]?: $Resolve<
        ObjectValues<O>[key]
      >;
    },
    {
      [key in ObjectRequiredKeys<O>]: key extends keyof ObjectValues<O>
        ? $Resolve<ObjectValues<O>[key]>
        : $Resolve<Any>;
    }
  >
>;
