import { A, B } from "ts-toolbelt";

import { Never } from "./never";

export type EnumTypeId = "enum";

export type Enum<V extends any> = A.Equals<V, never> extends B.True
  ? Never
  : { type: EnumTypeId; values: V };

export type EnumType = {
  type: EnumTypeId;
  values: any;
};

export type EnumValues<E extends EnumType> = E["values"];

export type ResolveEnum<T extends EnumType> = EnumValues<T>;
