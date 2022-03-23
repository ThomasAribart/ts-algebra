import { AnyType } from "./any";
import { NeverType } from "./never";
import { ConstType } from "./const";
import { EnumType } from "./enum";
import { PrimitiveType } from "./primitive";
import { ArrayType } from "./array";
import { TupleType } from "./tuple";
import { ObjectType } from "./object";
import { UnionType } from "./union";

export type Type =
  | AnyType
  | NeverType
  | ConstType
  | EnumType
  | PrimitiveType
  | ArrayType
  | TupleType
  | ObjectType
  | UnionType;
