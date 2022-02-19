import { A } from "ts-toolbelt";

import { If, DoesExtend } from "../utils";

import { Never, NeverType } from "./never";
import { Type } from "./type";
import { $Resolve } from "./resolve";

export type UnionTypeId = "union";

export type Union<V extends Type> = $Union<V>;

// TOIMPROVE: Maybe we can filter out Never values at instanciation
export type $Union<V> = If<
  A.Equals<V, never>,
  Never, // V extends NeverType should not be used as it spreads the union (Union<A | B> => Union<A> | Union<B>)
  DoesExtend<V, NeverType> extends true
    ? Never
    : { type: UnionTypeId; values: V }
>;

export type UnionType = {
  type: UnionTypeId;
  values: Type;
};

export type UnionValues<U extends UnionType> = U["values"];

export type ResolveUnion<U extends UnionType> = RecurseOnUnion<UnionValues<U>>;

type RecurseOnUnion<V extends Type> = V extends infer T ? $Resolve<T> : never;
