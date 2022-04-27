import { IsObject } from "../../utils";

import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { Const, ConstType, ConstValue } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { _Array, ArrayType } from "../array";
import { TupleType } from "../tuple";
import {
  ObjectType,
  ObjectValues,
  ObjectRequiredKeys,
  IsObjectOpen,
  ObjectOpenProps,
} from "../object";
import { UnionType } from "../union";
import { Type } from "../type";
import { Resolve } from "../resolve";

import { _Exclude } from "./index";
import { ExcludeUnion } from "./union";

export type ExcludeFromConst<A extends ConstType, B> = B extends Type
  ? B extends AnyType
    ? Never
    : B extends NeverType
    ? A
    : B extends ConstType
    ? CheckNotExtendsResolved<A, B>
    : B extends EnumType
    ? CheckNotExtendsResolved<A, B>
    : B extends PrimitiveType
    ? CheckNotExtendsResolved<A, B>
    : B extends ArrayType
    ? CheckNotExtendsResolved<A, B>
    : B extends TupleType
    ? CheckNotExtendsResolved<A, B>
    : B extends ObjectType
    ? ExcludeObject<A, B>
    : B extends UnionType
    ? ExcludeUnion<A, B>
    : Never
  : Never;

type CheckNotExtendsResolved<
  A extends ConstType,
  B extends Type
> = ConstValue<A> extends Resolve<B, { deserialize: false }> ? Never : A;

type ExcludeObject<A extends ConstType, B extends ObjectType> = IsObject<
  ConstValue<A>
> extends true
  ? ObjectRequiredKeys<B> extends keyof ConstValue<A>
    ? ExcludeObjectFromConst<A, B>
    : A
  : A;

type ExcludeObjectFromConst<
  A extends ConstType,
  B extends ObjectType,
  X = ExcludeConstValues<ConstValue<A>, B>
> = NonNeverKeys<X> extends never ? Never : A;

type NonNeverKeys<O> = {
  [key in keyof O]: O[key] extends Never ? never : key;
}[keyof O];

type ExcludeConstValues<V, B extends ObjectType> = {
  [key in keyof V]: key extends keyof ObjectValues<B>
    ? _Exclude<Const<V[key]>, ObjectValues<B>[key]>
    : IsObjectOpen<B> extends true
    ? _Exclude<Const<V[key]>, ObjectOpenProps<B>>
    : Const<V[key]>;
};
