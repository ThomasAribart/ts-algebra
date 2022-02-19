import { A, B, U } from "ts-toolbelt";

import { Type } from "..";
import { $Union, UnionType, UnionValues } from "../union";
import { $Intersect } from "../intersection";

import { _$Exclude } from "./index";

export type DistributeUnion<A extends UnionType, B> = $Union<
  RecurseOnUnionValues<UnionValues<A>, B>
>;

type RecurseOnUnionValues<V extends Type, B> = V extends infer T
  ? _$Exclude<T, B>
  : never;

export type ExcludeUnion<A, B extends UnionType> = A.Equals<
  UnionValues<B>,
  never
> extends B.True
  ? A
  : ExcludeUnionValue<A, U.Last<UnionValues<B>>, B>;

type ExcludeUnionValue<A, V, B extends UnionType> = $Intersect<
  _$Exclude<A, V>,
  _$Exclude<A, $Union<U.Exclude<UnionValues<B>, V>>>
>;
