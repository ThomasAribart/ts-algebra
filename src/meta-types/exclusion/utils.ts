import { And, Not } from "../../utils";

import { NeverType } from "../never";
import { Type } from "../type";

import { _$Exclude } from "./index";

export type CrossValue<
  V1 extends Type,
  P1 extends boolean,
  R1 extends boolean,
  V2 extends Type,
  P2 extends boolean,
  R2 extends boolean
> = {
  sourceValue: V1;
  isPossibleInSource: P1;
  isRequiredInSource: R1;
  isPossibleInExcluded: P2;
  isRequiredInExcluded: R2;
  exclusionValue: _$Exclude<V1, V2>;
};

export type CrossValueType = {
  sourceValue: Type;
  isPossibleInSource: boolean;
  isRequiredInSource: boolean;
  isPossibleInExcluded: boolean;
  isRequiredInExcluded: boolean;
  exclusionValue: any;
};

export type SourceValue<C extends CrossValueType> = C["sourceValue"];

type IsPossibleInSource<C extends CrossValueType> = C["isPossibleInSource"];

type IsRequiredInSource<C extends CrossValueType> = C["isRequiredInSource"];

type IsPossibleInExcluded<C extends CrossValueType> = C["isPossibleInExcluded"];

type IsRequiredInExcluded<C extends CrossValueType> = C["isRequiredInExcluded"];

export type ExclusionValue<C extends CrossValueType> = C["exclusionValue"];

export type IsOutsideOfSourceScope<C extends CrossValueType> = And<
  IsRequiredInExcluded<C>,
  Not<IsPossibleInSource<C>>
>;

export type IsOutsideOfExcludedScope<C extends CrossValueType> = And<
  IsRequiredInSource<C>,
  Not<IsPossibleInExcluded<C>>
>;

export type Propagate<C extends CrossValueType> =
  ExclusionValue<C> extends NeverType ? SourceValue<C> : ExclusionValue<C>;

export type IsOmittable<C extends CrossValueType> = And<
  Not<IsRequiredInSource<C>>,
  IsRequiredInExcluded<C>
>;
