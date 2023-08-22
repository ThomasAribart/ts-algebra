import type { IntersectUnion } from "./intersectUnion";

/**
 * Get the last item of a union
 * @param UNION Union
 * @returns Type
 */
export declare type UnionLast<UNION> = IntersectUnion<
  UNION extends unknown ? (x: UNION) => void : never
> extends (x: infer LAST) => void
  ? LAST
  : never;
