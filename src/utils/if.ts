/**
 * Return `Then` if `Condition` is `1`, `Else` otherwise
 * To replace when A.If is correctly exported: https://github.com/millsp/ts-toolbelt/issues/293
 *
 * @param I 0 | 1
 * @param T Type
 * @param E Type
 * @return Type
 */
export type If<I extends 0 | 1, T, E> = I extends 1 ? T : E;
