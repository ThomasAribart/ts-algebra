import { NeverType } from "./never";
import { AnyType } from "./any";
import { ConstType } from "./const";
import { EnumType } from "./enum";
import { PrimitiveType } from "./primitive";
import { ArrayType } from "./array";
import { TupleType } from "./tuple";
import { ObjectType } from "./object";
import { UnionType } from "./union";

export type Type =
  | NeverType
  | AnyType
  | ConstType
  | EnumType
  | PrimitiveType
  | ArrayType
  | TupleType
  | ObjectType
  | UnionType;

export type SerializableType = Type extends infer U
  ? U extends { isSerialized: boolean; deserialized: unknown }
    ? U
    : never
  : never;
