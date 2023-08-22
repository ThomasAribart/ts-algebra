import type { UnionLast } from "../../utils/unionLast";
import type { AnyType } from "../any";
import type { ArrayType } from "../array";
import type { Const, ConstType } from "../const";
import type { Enum, EnumType, EnumValues } from "../enum";
import type { $Intersect } from "../intersection";
import type { Never, NeverType } from "../never";
import type { ObjectType } from "../object";
import type { PrimitiveType } from "../primitive";
import type { TupleType } from "../tuple";
import type { Type } from "../type";
import type { UnionType } from "../union";
import type { _Exclude } from "./index";
import type { ExcludeUnion } from "./union";

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
  V = EnumValues<B>,
> = ExcludeEnumValue<A, UnionLast<V>, V>;

type ExcludeEnumValue<A extends Type, L, V> = $Intersect<
  _Exclude<A, Const<L>>,
  _Exclude<A, Enum<Exclude<V, L>>>
>;
