import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import {
  _$Object,
  ObjectType,
  ObjectValue,
  ObjectValues,
  ObjectRequiredKeys,
  ObjectOpenProps,
} from "../object";
import { UnionType } from "../union";
import { Type, SerializableType } from "../type";

import { Intersect, $Intersect } from "./index";
import { IntersectConstToObject } from "./const";
import { IntersectEnumToObject } from "./enum";
import { DistributeIntersection } from "./union";
import { IntersectDeserialized, IntersectIsSerialized } from "./utils";

export type MergeObjectPropsToSerializable<
  V extends Record<string, Type>,
  R extends string,
  P extends Type,
  A extends ObjectType,
  B extends SerializableType
> = $MergeObjectPropsToSerializable<V, R, P, A, B>;

type $MergeObjectPropsToSerializable<
  V,
  R,
  P,
  A extends ObjectType,
  B extends SerializableType
> = _$Object<V, R, P, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;

export type IntersectObject<A extends ObjectType, B> = B extends Type
  ? B extends AnyType
    ? MergeObjectPropsToSerializable<
        ObjectValues<A>,
        ObjectRequiredKeys<A>,
        ObjectOpenProps<A>,
        A,
        B
      >
    : B extends NeverType
    ? Never
    : B extends ConstType
    ? IntersectConstToObject<B, A>
    : B extends EnumType
    ? IntersectEnumToObject<B, A>
    : B extends PrimitiveType
    ? Never
    : B extends ArrayType
    ? Never
    : B extends TupleType
    ? Never
    : B extends ObjectType
    ? IntersectObjects<A, B>
    : B extends UnionType
    ? DistributeIntersection<B, A>
    : Never
  : Never;

type IntersectObjects<
  A extends ObjectType,
  B extends ObjectType,
  V extends Record<string, any> = IntersectObjectsValues<A, B>,
  O = Intersect<ObjectOpenProps<A>, ObjectOpenProps<B>>
> = $MergeObjectPropsToSerializable<
  {
    [key in keyof V]: V[key];
  },
  ObjectRequiredKeys<A> | ObjectRequiredKeys<B>,
  O,
  A,
  B
>;

type IntersectObjectsValues<A extends ObjectType, B extends ObjectType> = {
  [key in Extract<
    keyof ObjectValues<A> | keyof ObjectValues<B>,
    string
  >]: $Intersect<ObjectValue<A, key>, ObjectValue<B, key>>;
};
