/**
 * Given a union, returns the intersection of all its element
 * @param UNION Union
 * @returns Type
 */
export declare type IntersectUnion<UNION> = (
  UNION extends unknown ? (arg: UNION) => void : never
) extends (arg: infer INTERSECTION) => void
  ? INTERSECTION
  : never;
