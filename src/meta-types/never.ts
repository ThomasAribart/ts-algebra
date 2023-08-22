/**
 * Type id of the `Never` meta-type
 */
export type NeverTypeId = "never";

/**
 * Defines a `Never` meta-type
 */
export type Never = {
  type: NeverTypeId;
};

/**
 * Any `Never` meta-type
 */
export type NeverType = Never;

/**
 * Resolves a `Never` meta-type to its encapsulated type
 * @returns never
 */
export type ResolveNever = never;
