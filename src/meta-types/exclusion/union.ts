import type { If, IsNever, UnionLast } from "~/utils";

import type { Type } from "..";
import type { $Intersect } from "../intersection";
import type { $Union, UnionType, UnionValues } from "../union";
import type { _$Exclude } from "./index";

export type DistributeUnion<A extends UnionType, B> = $Union<
  RecurseOnUnionValues<UnionValues<A>, B>
>;

type RecurseOnUnionValues<V extends Type, B> = V extends infer T
  ? _$Exclude<T, B>
  : never;

export type ExcludeUnion<A, B extends UnionType> = If<
  IsNever<UnionValues<B>>,
  A,
  ExcludeUnionValue<A, UnionLast<UnionValues<B>>, B>
>;

type ExcludeUnionValue<A, V, B extends UnionType> = $Intersect<
  _$Exclude<A, V>,
  _$Exclude<A, $Union<Exclude<UnionValues<B>, V>>>
>;
