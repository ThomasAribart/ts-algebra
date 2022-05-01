import { U } from "ts-toolbelt";

import { Never, NeverType } from "../never";
import { AnyType } from "../any";
import { Const, ConstType } from "../const";
import { Enum, EnumType, EnumValues } from "../enum";
import { PrimitiveType } from "../primitive";
import { _Array, ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { $Intersect } from "../intersection";
import { Type } from "../type";

import { _Exclude } from "./index";
import { ExcludeUnion } from "./union";

export type ExcludeFromEnum<A extends EnumType, B> = B extends Type
  ? B extends NeverType
    ? A
    : B extends AnyType
    ? Never
    : B extends ConstType
    ? FilterSubstracted<A, B>
    : B extends EnumType
    ? FilterSubstracted<A, B>
    : B extends PrimitiveType
    ? FilterSubstracted<A, B>
    : B extends ArrayType
    ? FilterSubstracted<A, B>
    : B extends TupleType
    ? FilterSubstracted<A, B>
    : B extends ObjectType
    ? FilterSubstracted<A, B>
    : B extends UnionType
    ? ExcludeUnion<A, B>
    : Never
  : Never;

type FilterSubstracted<A extends EnumType, B extends Type> = Enum<
  RecurseOnEnumValues<EnumValues<A>, B>
>;

type RecurseOnEnumValues<V, B extends Type> = V extends infer EnumValue
  ? _Exclude<Const<EnumValue>, B> extends NeverType
    ? never
    : EnumValue
  : never;

export type ExcludeEnum<
  A extends Type,
  B extends EnumType,
  V = EnumValues<B>
> = ExcludeEnumValue<A, U.Last<V>, V>;

type ExcludeEnumValue<A extends Type, L, V> = $Intersect<
  _Exclude<A, Const<L>>,
  _Exclude<A, Enum<U.Exclude<V, L>>>
>;
