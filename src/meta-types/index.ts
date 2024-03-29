import type { Any, AnyType } from "./any";
import type { _$Array, _Array, ArrayType } from "./array";
import type { Const, ConstType } from "./const";
import type { Enum, EnumType } from "./enum";
import type { _$Exclude, _Exclude } from "./exclusion";
import type { $Intersect, Intersect } from "./intersection";
import type { Never, NeverType } from "./never";
import type { _$Object, _Object, ObjectType } from "./object";
import type { $Primitive, Primitive, PrimitiveType } from "./primitive";
import type { $Resolve, Resolve } from "./resolve";
import type { $Tuple, Tuple, TupleType } from "./tuple";
import type { Type } from "./type";
import type { $Union, Union, UnionType } from "./union";

export type {
  // --- META-TYPES ---
  Never,
  Any,
  Const,
  Enum,
  Primitive,
  $Primitive,
  _Array as Array,
  _$Array as $Array,
  Tuple,
  $Tuple,
  _Object as Object,
  _$Object as $Object,
  Union,
  $Union,
  // --- DEFINITIONS ---
  NeverType,
  AnyType,
  ConstType,
  EnumType,
  PrimitiveType,
  ArrayType,
  TupleType,
  ObjectType,
  UnionType,
  Type,
  // --- METHODS ---
  $Resolve,
  Resolve,
  $Intersect,
  Intersect,
  _$Exclude as $Exclude,
  _Exclude as Exclude,
};
