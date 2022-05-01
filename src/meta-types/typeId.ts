import { NeverTypeId } from "./never";
import { AnyTypeId } from "./any";
import { ConstTypeId } from "./const";
import { EnumTypeId } from "./enum";
import { PrimitiveTypeId } from "./primitive";
import { ArrayTypeId } from "./array";
import { TupleTypeId } from "./tuple";
import { ObjectTypeId } from "./object";
import { UnionTypeId } from "./union";

export type TypeId =
  | NeverTypeId
  | AnyTypeId
  | ConstTypeId
  | EnumTypeId
  | PrimitiveTypeId
  | ArrayTypeId
  | TupleTypeId
  | ObjectTypeId
  | UnionTypeId;
