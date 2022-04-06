import { L } from "ts-toolbelt";

import { DoesExtend, Not } from "../utils";

import { Never, NeverType } from "./never";
import { Type } from "./type";
import { Resolve } from "./resolve";

export type TupleTypeId = "tuple";

export type Tuple<V extends Type[], P extends Type = Never> = $Tuple<V, P>;

export type $Tuple<V, P = Never> = IsAnyValueNever<V> extends true
  ? Never
  : {
      type: TupleTypeId;
      values: V;
      isOpen: Not<DoesExtend<P, NeverType>>;
      openProps: P;
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
};

export type TupleValues<T extends TupleType> = T["values"];

export type IsTupleOpen<T extends TupleType> = T["isOpen"];

export type TupleOpenProps<T extends TupleType> = T["openProps"];

export type ResolveTuple<T extends TupleType> = IsTupleOpen<T> extends true
  ? L.Concat<RecurseOnTuple<TupleValues<T>>, [...Resolve<TupleOpenProps<T>>[]]>
  : RecurseOnTuple<TupleValues<T>>;

type RecurseOnTuple<V extends Type[], R extends any[] = []> = {
  stop: L.Reverse<R>;
  continue: RecurseOnTuple<L.Tail<V>, L.Prepend<R, Resolve<L.Head<V>>>>;
}[V extends [any, ...any[]] ? "continue" : "stop"];
