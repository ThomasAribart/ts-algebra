import { IsObject, IsArray } from "./extends";

/**
 * Recursively merge two types `A` and `B`:
 * - Returns `B` if `A` and `B` are not both objects or arrays
 * - Recursively merge `A` and `B` properties if both are objects
 * - Concat `A` and `B` if both are arrays
 *
 * `DeepMergeUnsafe` preserves non-required properties, but can return `never` if TS infers that `A & B = never` (which can happen if some properties are incompatible)
 *
 * @param A Type
 * @param B Type
 * @return Type
 */
export type DeepMergeUnsafe<A, B> = IsObject<A> extends true
  ? IsObject<B> extends true
    ? {
        [K in keyof (A & B)]: K extends keyof B
          ? K extends keyof A
            ? DeepMergeUnsafe<A[K], B[K]>
            : B[K]
          : K extends keyof A
          ? A[K]
          : never;
      }
    : B
  : IsArray<A> extends true
  ? IsArray<B> extends true
    ? B extends unknown[]
      ? // 🔧 TOIMPROVE: Not cast here
        [...(A extends unknown[] ? A : never), B]
      : never
    : B
  : B;
