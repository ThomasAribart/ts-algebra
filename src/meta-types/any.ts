import type { And } from "../utils";
import type { ResolveOptions } from "./resolve";
import type { Deserialized, IsSerialized } from "./utils";

export type AnyTypeId = "any";

export type Any<I extends boolean = false, D = never> = {
  type: AnyTypeId;
  isSerialized: I;
  deserialized: D;
};

export type AnyType = {
  type: AnyTypeId;
  isSerialized: boolean;
  deserialized: unknown;
};

export type ResolveAny<A extends AnyType, O extends ResolveOptions> = And<
  O["deserialize"],
  IsSerialized<A>
> extends true
  ? Deserialized<A>
  : unknown;
