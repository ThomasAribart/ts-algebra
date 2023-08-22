import type { IsArray, IsObject } from "./extends";

/**
 * Recursively merge two types `A` and `B`:
 * - Returns `B` if `A` and `B` are not both objects or arrays
 * - Recursively merge `A` and `B` properties if both are objects
 * - Concat `A` and `B` if both are arrays
 *
 * `DeepMergeUnsafe` preserves non-required properties, but can return `never` if TS infers that `A & B = never` (which can happen if some properties are incompatible)
 * @param TYPE_A Type
 * @param TYPE_B Type
 * @returns Type
 */
export type DeepMergeUnsafe<TYPE_A, TYPE_B> = IsObject<TYPE_A> extends true
  ? IsObject<TYPE_B> extends true
    ? {
        [KEY in keyof (TYPE_A & TYPE_B)]: KEY extends keyof TYPE_B
          ? KEY extends keyof TYPE_A
            ? DeepMergeUnsafe<TYPE_A[KEY], TYPE_B[KEY]>
            : TYPE_B[KEY]
          : KEY extends keyof TYPE_A
          ? TYPE_A[KEY]
          : never;
      }
    : TYPE_B
  : IsArray<TYPE_A> extends true
  ? IsArray<TYPE_B> extends true
    ? TYPE_B extends unknown[]
      ? // 🔧 TOIMPROVE: Not cast here
        [...(TYPE_A extends unknown[] ? TYPE_A : never), TYPE_B]
      : never
    : TYPE_B
  : TYPE_B;
