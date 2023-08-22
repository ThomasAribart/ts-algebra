/**
 * Omit the first element of an array
 * @param ARRAY Array
 * @returns Array
 */
export type Tail<ARRAY extends unknown[]> = ARRAY extends readonly []
  ? ARRAY
  : ARRAY extends readonly [unknown?, ...infer TAIL]
  ? TAIL
  : ARRAY;
