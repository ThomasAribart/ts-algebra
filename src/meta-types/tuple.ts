import { L } from "ts-toolbelt";

import { DoesExtend, Not, And } from "../utils";

import { Never, NeverType } from "./never";
import { Type } from "./type";
import { Resolve, ResolveOptions } from "./resolve";
import { Deserialized, IsSerialized } from "./utils";

export type TupleTypeId = "tuple";

export type Tuple<
  V extends Type[],
  P extends Type = Never,
  I extends boolean = false,
  D extends unknown = never
> = $Tuple<V, P, I, D>;

export type $Tuple<
  V,
  P = Never,
  I = false,
  D = never
> = IsAnyValueNever<V> extends true
  ? Never
  : {
      type: TupleTypeId;
      values: V;
      isOpen: Not<DoesExtend<P, NeverType>>;
      openProps: P;
      isSerialized: I;
      deserialized: D;
    };

type IsAnyValueNever<V> = {
  stop: false;
  continue: V extends any[]
    ? L.Head<V> extends NeverType
      ? true
      : IsAnyValueNever<L.Tail<V>>
    : true;
}[V extends [any, ...any[]] ? "continue" : "stop"];

export type TupleType = {
  type: TupleTypeId;
  values: Type[];
  isOpen: boolean;
  openProps: Type;
  isSerialized: boolean;
  deserialized: unknown;
};

export type TupleValues<T extends TupleType> = T["values"];

export type IsTupleOpen<T extends TupleType> = T["isOpen"];

export type TupleOpenProps<T extends TupleType> = T["openProps"];

export type ResolveTuple<T extends TupleType, O extends ResolveOptions> = And<
  O["deserialize"],
  IsSerialized<T>
> extends true
  ? Deserialized<T>
  : IsTupleOpen<T> extends true
  ? L.Concat<
      RecurseOnTuple<TupleValues<T>, O>,
      [...Resolve<TupleOpenProps<T>, O>[]]
    >
  : RecurseOnTuple<TupleValues<T>, O>;

type RecurseOnTuple<
  V extends Type[],
  O extends ResolveOptions,
  R extends any[] = []
> = {
  stop: L.Reverse<R>;
  continue: RecurseOnTuple<L.Tail<V>, O, L.Prepend<R, Resolve<L.Head<V>, O>>>;
}[V extends [any, ...any[]] ? "continue" : "stop"];
