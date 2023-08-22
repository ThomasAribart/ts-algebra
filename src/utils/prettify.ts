import type { IsObject } from "./extends";

/**
 * Resolves generic definitions in hover windows to human-friendly results
 * @param TYPE Type
 * @returns Type
 */
export type Prettify<TYPE> = IsObject<TYPE> extends true
  ? {
      [KEY in keyof TYPE]: KEY extends keyof TYPE ? TYPE[KEY] : never;
    }
  : TYPE;
