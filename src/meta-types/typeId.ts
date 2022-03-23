import { AnyTypeId } from "./any";
import { NeverTypeId } from "./never";
import { ConstTypeId } from "./const";
import { EnumTypeId } from "./enum";
import { PrimitiveTypeId } from "./primitive";
import { ArrayTypeId } from "./array";
import { TupleTypeId } from "./tuple";
import { ObjectTypeId } from "./object";
import { UnionTypeId } from "./union";

export type TypeId =
  | AnyTypeId
  | NeverTypeId
  | ConstTypeId
  | EnumTypeId
  | PrimitiveTypeId
  | ArrayTypeId
  | TupleTypeId
  | ObjectTypeId
  | UnionTypeId;
