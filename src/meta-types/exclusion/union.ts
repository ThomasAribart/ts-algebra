import type { If, IsNever, UnionLast } from "~/utils";

import type { Type } from "..";
import type { $Intersect } from "../intersection";
import type { $Union, UnionType, UnionValues } from "../union";
import type { _$Exclude } from "./index";

export type DistributeUnion<META_UNION extends UnionType, META_TYPE> = $Union<
  RecurseOnUnionValues<UnionValues<META_UNION>, META_TYPE>
>;

type RecurseOnUnionValues<
  META_UNION_VALUES extends Type,
  META_TYPE,
> = META_UNION_VALUES extends infer META_UNION_VALUE
  ? _$Exclude<META_UNION_VALUE, META_TYPE>
  : never;

export type ExcludeUnion<META_TYPE, META_UNION extends UnionType> = If<
  IsNever<UnionValues<META_UNION>>,
  META_TYPE,
  ExcludeUnionValue<META_TYPE, UnionLast<UnionValues<META_UNION>>, META_UNION>
>;

type ExcludeUnionValue<
  META_TYPE,
  META_UNION_VALUE,
  META_UNION extends UnionType,
> = $Intersect<
  _$Exclude<META_TYPE, META_UNION_VALUE>,
  _$Exclude<
    META_TYPE,
    $Union<Exclude<UnionValues<META_UNION>, META_UNION_VALUE>>
  >
>;
