import type { Or } from "~/utils";

import type { SerializableType } from "../type";
import type { Deserialized, IsSerialized } from "../utils";

export type IntersectIsSerialized<
  A extends SerializableType,
  B extends SerializableType,
> = Or<IsSerialized<A>, IsSerialized<B>>;

export type IntersectDeserialized<
  A extends SerializableType,
  B extends SerializableType,
> = IsSerialized<A> extends true
  ? IsSerialized<B> extends true
    ? Deserialized<A> & Deserialized<B>
    : Deserialized<A>
  : IsSerialized<B> extends true
  ? Deserialized<B>
  : never;
