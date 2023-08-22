/**
 * Given a union, returns the intersection of all its element
 * @param UNION Union
 * @returns Type
 */
export declare type IntersectUnion<UNION> = (
  UNION extends unknown ? (k: UNION) => void : never
) extends (k: infer INTERSECTION) => void
  ? INTERSECTION
  : never;
