import type { IsObject } from "./extends";

/**
 * Resolves generic definitions in hover windows to human-friendly results
 * @param T Type
 * @returns Type
 */
export type Prettify<T> = IsObject<T> extends true
  ? {
      [K in keyof T]: K extends keyof T ? T[K] : never;
    }
  : T;
