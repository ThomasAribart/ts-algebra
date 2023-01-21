/**
 * Return `Then` if `Condition` is `1`, `Else` otherwise
 * To replace when A.If is correctly exported: https://github.com/millsp/ts-toolbelt/issues/293
 *
 * @param I Boolean
 * @param T Type
 * @param E Type
 * @return Type
 */
export type If<I extends boolean, T, E> = I extends true ? T : E;
