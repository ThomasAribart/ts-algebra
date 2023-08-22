/**
 * Returns `true` if `TYPE_A` extends `TYPE_B`, `false` if not
 * @param TYPE_A Type
 * @param TYPE_B Type
 * @returns Boolean
 */
export type DoesExtend<TYPE_A, TYPE_B> = [TYPE_A] extends [TYPE_B]
  ? true
  : false;

/**
 * Array keys
 */
type ArrayKeys = keyof [];

/**
 * Returns `true` if type is object, `false` if not (excludes arrays)
 * @param TYPE Type
 * @returns Boolean
 */
export type IsObject<TYPE> = TYPE extends object
  ? ArrayKeys extends Extract<keyof TYPE, ArrayKeys>
    ? false
    : true
  : false;

/**
 * Returns `true` if type is array, `false` if not (excludes objects)
 * @param TYPE Type
 * @returns Boolean
 */
export type IsArray<TYPE> = TYPE extends object
  ? ArrayKeys extends Extract<keyof TYPE, ArrayKeys>
    ? true
    : false
  : false;
