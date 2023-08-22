/**
 * Return `true` if `TYPE` is `never`, `false` otherwise
 * @param TYPE Type
 * @returns Boolean
 */
export type IsNever<TYPE> = [TYPE] extends [never] ? true : false;
