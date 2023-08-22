import type { And, DeepMergeUnsafe, DoesExtend, Not } from "../utils";
import type { Any } from "./any";
import type { Never, NeverType } from "./never";
import type { Resolve, ResolveOptions } from "./resolve";
import type { Type } from "./type";
import type { Deserialized, IsSerialized } from "./utils";

export type ObjectTypeId = "object";

// Prefixed with _ to not confuse with native TS Object
export type _Object<
  V extends Record<string, Type> = {},
  R extends string = never,
  P extends Type = Never,
  I extends boolean = false,
  D = never,
> = _$Object<V, R, P, I, D>;

export type _$Object<
  V = {},
  R = never,
  P = Never,
  I = false,
  D = never,
> = DoesExtend<
  true,
  {
    [key in Extract<R, string>]: key extends keyof V
      ? DoesExtend<V[key], NeverType>
      : DoesExtend<P, NeverType>;
  }[Extract<R, string>]
> extends true
  ? Never
  : {
      type: ObjectTypeId;
      values: V;
      required: R;
      isOpen: Not<DoesExtend<P, NeverType>>;
      openProps: P;
      isSerialized: I;
      deserialized: D;
    };

export type ObjectType = {
  type: ObjectTypeId;
  values: Record<string, Type>;
  required: string;
  isOpen: boolean;
  openProps: Type;
  isSerialized: boolean;
  deserialized: unknown;
};

export type ObjectValues<O extends ObjectType> = O["values"];

export type ObjectValue<
  O extends ObjectType,
  K extends string,
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

export type ResolveObject<O extends ObjectType, P extends ResolveOptions> = And<
  P["deserialize"],
  IsSerialized<O>
> extends true
  ? Deserialized<O>
  : DeepMergeUnsafe<
      IsObjectOpen<O> extends true
        ? IsObjectEmpty<O> extends true
          ? { [key: string]: Resolve<ObjectOpenProps<O>, P> }
          : { [key: string]: Resolve<Any, P> }
        : {},
      DeepMergeUnsafe<
        {
          [key in Exclude<
            keyof ObjectValues<O>,
            ObjectRequiredKeys<O>
          >]?: Resolve<ObjectValues<O>[key], P>;
        },
        {
          [key in ObjectRequiredKeys<O>]: key extends keyof ObjectValues<O>
            ? Resolve<ObjectValues<O>[key], P>
            : Resolve<Any, P>;
        }
      >
    >;
