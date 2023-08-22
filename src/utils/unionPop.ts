import type { UnionLast } from "./unionLast";

/**
 * Remove an item out of a union
 * @param UNION Union
 * @returns Type
 */
export declare type UnionPop<UNION> = Exclude<UNION, UnionLast<UNION>>;
