import { AnyType, ResolveAny } from "./any";
import { NeverType, ResolveNever } from "./never";
import { ConstType, ResolveConst } from "./const";
import { EnumType, ResolveEnum } from "./enum";
import { PrimitiveType, ResolvePrimitive } from "./primitive";
import { ArrayType, ResolveArray } from "./array";
import { TupleType, ResolveTuple } from "./tuple";
import { ObjectType, ResolveObject } from "./object";
import { UnionType, ResolveUnion } from "./union";
import { Type } from "./type";

export type Resolve<T extends Type> = $Resolve<T>;

export type $Resolve<T> = T extends AnyType
  ? ResolveAny
  : T extends NeverType
  ? ResolveNever
  : T extends ConstType
  ? ResolveConst<T>
  : T extends EnumType
  ? ResolveEnum<T>
  : T extends PrimitiveType
  ? ResolvePrimitive<T>
  : T extends ArrayType
  ? ResolveArray<T>
  : T extends TupleType
  ? ResolveTuple<T>
  : T extends ObjectType
  ? ResolveObject<T>
  : T extends UnionType
  ? ResolveUnion<T>
  : never;
