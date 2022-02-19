import { Any, AnyType, AnyTypeId } from "./any";
import { Never, NeverType, NeverTypeId } from "./never";
import { Const, ConstType, ConstTypeId } from "./const";
import { Enum, EnumType, EnumTypeId } from "./enum";
import {
  Primitive,
  $Primitive,
  PrimitiveType,
  PrimitiveTypeId,
} from "./primitive";
import { _Array, _$Array, ArrayType, ArrayTypeId } from "./array";
import { Tuple, $Tuple, TupleType, TupleTypeId } from "./tuple";
import { _Object, _$Object, ObjectType, ObjectTypeId } from "./object";
import { Union, $Union, UnionType, UnionTypeId } from "./union";
import { Intersect, $Intersect } from "./intersection";
import { _Exclude, _$Exclude } from "./exclusion";
import { $Error, Error, ErrorType, ErrorTypeId } from "./error";

import { Type } from "./type";
import { TypeId } from "./typeId";

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
  Error,
  $Error,
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
  ErrorType,
  Type,
  // --- IDS ---
  AnyTypeId,
  NeverTypeId,
  ConstTypeId,
  EnumTypeId,
  PrimitiveTypeId,
  ArrayTypeId,
  TupleTypeId,
  ObjectTypeId,
  UnionTypeId,
  ErrorTypeId,
  TypeId,
  // --- METHODS ---
  $Resolve,
  Resolve,
  $Intersect,
  Intersect,
  _$Exclude as $Exclude,
  _Exclude as Exclude,
};
