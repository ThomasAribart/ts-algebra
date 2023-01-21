import { If, IsNever, DoesExtend } from "../utils";

import { Never, NeverType } from "./never";
import { $Resolve, ResolveOptions } from "./resolve";
import { Type } from "./type";

export type UnionTypeId = "union";

export type Union<V extends Type> = $Union<V>;

// TOIMPROVE: Maybe we can filter out Never values at instanciation
export type $Union<V> = If<
  IsNever<V>,
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

export type ResolveUnion<
  U extends UnionType,
  O extends ResolveOptions
> = RecurseOnUnion<UnionValues<U>, O>;

type RecurseOnUnion<
  V extends Type,
  O extends ResolveOptions
> = V extends infer T ? $Resolve<T, O> : never;
