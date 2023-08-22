/**
 * Return `true` if `BOOL_A` and `BOOL_B` extend `true`, `false` otherwise
 * @param BOOL_A Type
 * @param BOOL_B Type
 * @returns Boolean
 */
export type And<BOOL_A, BOOL_B> = BOOL_A extends true
  ? BOOL_B extends true
    ? true
    : false
  : false;
