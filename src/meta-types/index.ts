import { Any, AnyType } from "./any";
import { Never, NeverType } from "./never";
import { Const, ConstType } from "./const";
import { Enum, EnumType } from "./enum";
import { Primitive, $Primitive, PrimitiveType } from "./primitive";
import { _Array, _$Array, ArrayType } from "./array";
import { Tuple, $Tuple, TupleType } from "./tuple";
import { _Object, _$Object, ObjectType } from "./object";
import { Union, $Union, UnionType } from "./union";
import { Intersect, $Intersect } from "./intersection";
import { _Exclude, _$Exclude } from "./exclusion";

import { Type } from "./type";

import { Resolve, $Resolve } from "./resolve";

export {
  // --- META-TYPES ---
  Any,
  Never,
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
  AnyType,
  NeverType,
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
