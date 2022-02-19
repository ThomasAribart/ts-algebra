import { A } from "ts-toolbelt";

import { If } from "../utils";

import { Never } from "./never";

export type EnumTypeId = "enum";

export type Enum<V extends any> = If<
  A.Equals<V, never>,
  Never,
  { type: EnumTypeId; values: V }
>;

export type EnumType = {
  type: EnumTypeId;
  values: any;
};

export type EnumValues<E extends EnumType> = E["values"];

export type ResolveEnum<T extends EnumType> = EnumValues<T>;
