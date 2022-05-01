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
  originValue: V1;
  isPossibleInOrigin: P1;
  isRequiredInOrigin: R1;
  isPossibleInSubstracted: P2;
  isRequiredInSubstracted: R2;
  exclusionResult: _$Exclude<V1, V2>;
};

export type CrossValueType = {
  originValue: Type;
  isPossibleInOrigin: boolean;
  isRequiredInOrigin: boolean;
  isPossibleInSubstracted: boolean;
  isRequiredInSubstracted: boolean;
  exclusionResult: any;
};

export type OriginValue<C extends CrossValueType> = C["originValue"];

type IsPossibleInOrigin<C extends CrossValueType> = C["isPossibleInOrigin"];

type IsRequiredInOrigin<C extends CrossValueType> = C["isRequiredInOrigin"];

type IsPossibleInSubstracted<C extends CrossValueType> =
  C["isPossibleInSubstracted"];

type IsRequiredInSubstracted<C extends CrossValueType> =
  C["isRequiredInSubstracted"];

export type ExclusionResult<C extends CrossValueType> = C["exclusionResult"];

export type IsOutsideOfOriginScope<C extends CrossValueType> = And<
  IsRequiredInSubstracted<C>,
  Not<IsPossibleInOrigin<C>>
>;

export type IsOutsideOfSubstractedScope<C extends CrossValueType> = And<
  IsRequiredInOrigin<C>,
  Not<IsPossibleInSubstracted<C>>
>;

export type Propagate<C extends CrossValueType> =
  ExclusionResult<C> extends NeverType ? OriginValue<C> : ExclusionResult<C>;

export type IsOmittable<C extends CrossValueType> = And<
  Not<IsRequiredInOrigin<C>>,
  IsRequiredInSubstracted<C>
>;
