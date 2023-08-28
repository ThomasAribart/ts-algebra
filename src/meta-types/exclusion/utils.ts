import type { And, Not } from "~/utils";

import type { NeverType } from "../never";
import type { Type } from "../type";
import type { _$Exclude } from "./index";

export type CrossValue<
  VALUE_A extends Type,
  IS_OPEN_A extends boolean,
  IS_REQUIRED_A extends boolean,
  VALUE_B extends Type,
  IS_OPEN_B extends boolean,
  IS_REQUIRED_B extends boolean,
> = {
  sourceValue: VALUE_A;
  isPossibleInSource: IS_OPEN_A;
  isRequiredInSource: IS_REQUIRED_A;
  isPossibleInExcluded: IS_OPEN_B;
  isRequiredInExcluded: IS_REQUIRED_B;
  exclusionResult: _$Exclude<VALUE_A, VALUE_B>;
};

export type CrossValueType = {
  sourceValue: Type;
  isPossibleInSource: boolean;
  isRequiredInSource: boolean;
  isPossibleInExcluded: boolean;
  isRequiredInExcluded: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exclusionResult: any;
};

export type SourceValue<CROSSED_VALUE extends CrossValueType> =
  CROSSED_VALUE["sourceValue"];

type IsPossibleInSource<CROSSED_VALUE extends CrossValueType> =
  CROSSED_VALUE["isPossibleInSource"];

type IsRequiredInSource<CROSSED_VALUE extends CrossValueType> =
  CROSSED_VALUE["isRequiredInSource"];

type IsPossibleInExcluded<CROSSED_VALUE extends CrossValueType> =
  CROSSED_VALUE["isPossibleInExcluded"];

type IsRequiredInExcluded<CROSSED_VALUE extends CrossValueType> =
  CROSSED_VALUE["isRequiredInExcluded"];

export type ExclusionResult<CROSSED_VALUE extends CrossValueType> =
  CROSSED_VALUE["exclusionResult"];

export type IsOutsideOfSourceScope<CROSSED_VALUE extends CrossValueType> = And<
  IsRequiredInExcluded<CROSSED_VALUE>,
  Not<IsPossibleInSource<CROSSED_VALUE>>
>;

export type IsOutsideOfExcludedScope<CROSSED_VALUE extends CrossValueType> =
  And<
    IsRequiredInSource<CROSSED_VALUE>,
    Not<IsPossibleInExcluded<CROSSED_VALUE>>
  >;

export type Propagate<CROSSED_VALUE extends CrossValueType> =
  ExclusionResult<CROSSED_VALUE> extends NeverType
    ? SourceValue<CROSSED_VALUE>
    : ExclusionResult<CROSSED_VALUE>;

export type IsOmittable<CROSSED_VALUE extends CrossValueType> = And<
  Not<IsRequiredInSource<CROSSED_VALUE>>,
  IsRequiredInExcluded<CROSSED_VALUE>
>;
