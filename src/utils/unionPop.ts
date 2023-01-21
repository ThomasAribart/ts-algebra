import { UnionLast } from "./unionLast";

/**
 * Remove an item out of a union
 */
export declare type UnionPop<U> = Exclude<U, UnionLast<U>>;
