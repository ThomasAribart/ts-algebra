/**
 * Return `true` if `BOOL_A` or `BOOL_B` extend `true`, `false` otherwise
 * @param BOOL_A Type
 * @param BOOL_B Type
 * @returns Boolean
 */
export type Or<
  BOOL_A extends boolean,
  BOOL_B extends boolean,
> = BOOL_A extends true ? true : BOOL_B extends true ? true : false;
