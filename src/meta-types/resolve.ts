import type { AnyType, ResolveAny } from "./any";
import type { ArrayType, ResolveArray } from "./array";
import type { ConstType, ResolveConst } from "./const";
import type { EnumType, ResolveEnum } from "./enum";
import type { NeverType, ResolveNever } from "./never";
import type { ObjectType, ResolveObject } from "./object";
import type { PrimitiveType, ResolvePrimitive } from "./primitive";
import type { ResolveTuple, TupleType } from "./tuple";
import type { Type } from "./type";
import type { ResolveUnion, UnionType } from "./union";

export type ResolveOptions = {
  deserialize: boolean;
};

export type ResolveDefaultOptions = {
  deserialize: true;
};

export type Resolve<
  T extends Type,
  O extends ResolveOptions = ResolveDefaultOptions,
> = $Resolve<T, O>;

export type $Resolve<
  T,
  O extends ResolveOptions = ResolveDefaultOptions,
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
