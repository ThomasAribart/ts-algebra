import { IntersectUnion } from "./intersectUnion";

/**
 * Get the last item within an Union
 */
export declare type UnionLast<U> = IntersectUnion<
  U extends unknown ? (x: U) => void : never
> extends (x: infer P) => void
  ? P
  : never;
