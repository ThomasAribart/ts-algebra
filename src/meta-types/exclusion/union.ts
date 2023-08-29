import type { If, IsNever, UnionLast } from "~/utils";

import type { $Intersect } from "../intersection";
import type { $Union, UnionType, UnionValues } from "../union";
import type { _$Exclude } from "./index";

/**
 * Excludes from a `Union` meta-type any other meta-type
 * @param META_UNION UnionType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
export type ExcludeFromUnion<META_UNION extends UnionType, META_TYPE> = $Union<
  UnionValues<META_UNION> extends infer META_UNION_VALUE
    ? _$Exclude<META_UNION_VALUE, META_TYPE>
    : never
>;

/**
 * Excludes from any meta-type a `Union` meta-type
 * @param META_TYPE MetaType
 * @param META_UNION UnionType
 * @returns MetaType
 */
export type ExcludeUnion<META_TYPE, META_UNION extends UnionType> = If<
  IsNever<UnionValues<META_UNION>>,
  META_TYPE,
  RecurseOnUnionValues<
    META_TYPE,
    UnionLast<UnionValues<META_UNION>>,
    META_UNION
  >
>;

/**
 * Recursively excludes a `Union` meta-type values from any meta-type
 *
 * To do so, we pick a value, exclude it from the meta-type and intersect the result to the exclusion of the rest: `A \ (B | C) = (A \ B) & (A \ C)`
 * @param META_TUPLE TupleType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
type RecurseOnUnionValues<
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
