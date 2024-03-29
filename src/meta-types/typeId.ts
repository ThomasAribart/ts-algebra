import type { AnyTypeId } from "./any";
import type { ArrayTypeId } from "./array";
import type { ConstTypeId } from "./const";
import type { EnumTypeId } from "./enum";
import type { NeverTypeId } from "./never";
import type { ObjectTypeId } from "./object";
import type { PrimitiveTypeId } from "./primitive";
import type { TupleTypeId } from "./tuple";
import type { UnionTypeId } from "./union";

/**
 * Union of all meta-type ids
 */
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
