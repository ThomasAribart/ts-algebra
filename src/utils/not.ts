/**
 * Return `true` if `BOOL` extends `false`, `false` if `BOOL` extends `true`, `never` otherwise
 * @param BOOL Type
 * @returns Boolean
 */
export type Not<BOOL extends boolean> = BOOL extends false
  ? true
  : BOOL extends true
  ? false
  : never;
