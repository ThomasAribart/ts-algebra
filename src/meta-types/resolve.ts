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

export type ResolveOptions = {
  deserialize: boolean;
};

export type ResolveDefaultOptions = {
  deserialize: true;
};

export type Resolve<
  T extends Type,
  O extends ResolveOptions = ResolveDefaultOptions
> = $Resolve<T, O>;

export type $Resolve<
  T,
  O extends ResolveOptions = ResolveDefaultOptions
> = T extends AnyType
  ? ResolveAny<T, O>
  : T extends NeverType
  ? ResolveNever
  : T extends ConstType
  ? ResolveConst<T, O>
  : T extends EnumType
  ? ResolveEnum<T, O>
  : T extends PrimitiveType
  ? ResolvePrimitive<T, O>
  : T extends ArrayType
  ? ResolveArray<T, O>
  : T extends TupleType
  ? ResolveTuple<T, O>
  : T extends ObjectType
  ? ResolveObject<T, O>
  : T extends UnionType
  ? ResolveUnion<T, O>
  : never;
