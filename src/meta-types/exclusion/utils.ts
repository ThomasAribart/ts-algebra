import type { And, Not } from "~/utils";

import type { NeverType } from "../never";
import type { Type } from "../type";
import type { _$Exclude } from "./index";

/**
 * For nested meta-types exclusions (`Tuple`, `Object`), temporary store the results of source & excluded meta-type value exclusions for analysis and propagation.
 * @param VALUE_A MetaType
 * @param IS_ALLOWED_IN_A Boolean
 * @param IS_REQUIRED_IN_A Boolean
 * @param VALUE_B MetaType
 * @param IS_ALLOWED_IN_B Boolean
 * @param IS_REQUIRED_IN_B Boolean
 * @returns ValueExclusionResult
 */
export type ValueExclusionResult<
  VALUE_A extends Type,
  IS_ALLOWED_IN_A extends boolean,
  IS_REQUIRED_IN_A extends boolean,
  VALUE_B extends Type,
  IS_ALLOWED_IN_B extends boolean,
  IS_REQUIRED_IN_B extends boolean,
> = {
  sourceValue: VALUE_A;
  isAllowedInSource: IS_ALLOWED_IN_A;
  isRequiredInSource: IS_REQUIRED_IN_A;
  isAllowedInExcluded: IS_ALLOWED_IN_B;
  isRequiredInExcluded: IS_REQUIRED_IN_B;
  exclusionResult: _$Exclude<VALUE_A, VALUE_B>;
};

/**
 * Any `ValueExclusionResult`
 */
export type ValueExclusionResultType = {
  sourceValue: Type;
  isAllowedInSource: boolean;
  isRequiredInSource: boolean;
  isAllowedInExcluded: boolean;
  isRequiredInExcluded: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exclusionResult: any;
};

/**
 * Source value of a `ValueExclusionResult`
 * @param VALUE_EXCLUSION_RESULT ValueExclusionResult
 * @returns MetaType
 */
export type SourceValue<
  VALUE_EXCLUSION_RESULT extends ValueExclusionResultType,
> = VALUE_EXCLUSION_RESULT["sourceValue"];

/**
 * Returns `true` if value is allowed in an exclusion source MetaType, `false` otherwise
 * @param VALUE_EXCLUSION_RESULT ValueExclusionResult
 * @returns Boolean
 */
type IsAllowedInSource<
  VALUE_EXCLUSION_RESULT extends ValueExclusionResultType,
> = VALUE_EXCLUSION_RESULT["isAllowedInSource"];

/**
 * Returns `true` if value is required in an exclusion source MetaType, `false` otherwise
 * @param VALUE_EXCLUSION_RESULT ValueExclusionResult
 * @returns Boolean
 */
type IsRequiredInSource<
  VALUE_EXCLUSION_RESULT extends ValueExclusionResultType,
> = VALUE_EXCLUSION_RESULT["isRequiredInSource"];

/**
 * Excluded value of a `ValueExclusionResult`
 * @param VALUE_EXCLUSION_RESULT ValueExclusionResult
 * @returns MetaType
 */
export type ExclusionResult<
  VALUE_EXCLUSION_RESULT extends ValueExclusionResultType,
> = VALUE_EXCLUSION_RESULT["exclusionResult"];

/**
 * Returns `true` if value is allowed in an exclusion excluded MetaType, `false` otherwise
 * @param VALUE_EXCLUSION_RESULT ValueExclusionResult
 * @returns Boolean
 */
type IsAllowedInExcluded<
  VALUE_EXCLUSION_RESULT extends ValueExclusionResultType,
> = VALUE_EXCLUSION_RESULT["isAllowedInExcluded"];

/**
 * Returns `true` if value is required in an exclusion excluded MetaType, `false` otherwise
 * @param VALUE_EXCLUSION_RESULT ValueExclusionResult
 * @returns Boolean
 */
type IsRequiredInExcluded<
  VALUE_EXCLUSION_RESULT extends ValueExclusionResultType,
> = VALUE_EXCLUSION_RESULT["isRequiredInExcluded"];

/**
 * Returns `true` if value is not allowed in an exclusion source MetaType but required in its excluded MetaType, `false` otherwise
 * @param VALUE_EXCLUSION_RESULT ValueExclusionResult
 * @returns Boolean
 */
export type IsOutsideOfSourceScope<
  VALUE_EXCLUSION_RESULT extends ValueExclusionResultType,
> = And<
  Not<IsAllowedInSource<VALUE_EXCLUSION_RESULT>>,
  IsRequiredInExcluded<VALUE_EXCLUSION_RESULT>
>;

/**
 * Returns `true` if value is required in an exclusion source MetaType but not allowed in its excluded MetaType, `false` otherwise
 * @param VALUE_EXCLUSION_RESULT ValueExclusionResult
 * @returns Boolean
 */
export type IsOutsideOfExcludedScope<
  VALUE_EXCLUSION_RESULT extends ValueExclusionResultType,
> = And<
  IsRequiredInSource<VALUE_EXCLUSION_RESULT>,
  Not<IsAllowedInExcluded<VALUE_EXCLUSION_RESULT>>
>;

/**
 * Returns `true` if value is not required in an exclusion source MetaType but required in its excluded MetaType, `false` otherwise
 * @param VALUE_EXCLUSION_RESULT ValueExclusionResult
 * @returns Boolean
 */
export type IsOmittable<
  VALUE_EXCLUSION_RESULT extends ValueExclusionResultType,
> = And<
  Not<IsRequiredInSource<VALUE_EXCLUSION_RESULT>>,
  IsRequiredInExcluded<VALUE_EXCLUSION_RESULT>
>;

/**
 * Returns the propagated exclusion of a value exclusion
 * @param VALUE_EXCLUSION_RESULT ValueExclusionResult
 * @returns MetaType
 */
export type PropagateExclusion<
  VALUE_EXCLUSION_RESULT extends ValueExclusionResultType,
> = ExclusionResult<VALUE_EXCLUSION_RESULT> extends NeverType
  ? SourceValue<VALUE_EXCLUSION_RESULT>
  : ExclusionResult<VALUE_EXCLUSION_RESULT>;
