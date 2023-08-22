import type { SerializableType } from "./type";

export type IsSerialized<T extends SerializableType> = T["isSerialized"];

export type Deserialized<T extends SerializableType> = T["deserialized"];
