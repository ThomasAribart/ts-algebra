import type { AnyType } from "../any";
import type { ArrayType } from "../array";
import type { ConstType } from "../const";
import type { EnumType } from "../enum";
import type { Never, NeverType } from "../never";
import type {
  _$Object,
  ObjectOpenProps,
  ObjectRequiredKeys,
  ObjectType,
  ObjectValue,
  ObjectValues,
} from "../object";
import type { PrimitiveType } from "../primitive";
import type { TupleType } from "../tuple";
import type { SerializableType, Type } from "../type";
import type { UnionType } from "../union";
import type { IntersectConstToObject } from "./const";
import type { IntersectEnumToObject } from "./enum";
import type { $Intersect, Intersect } from "./index";
import type { DistributeIntersection } from "./union";
import type { IntersectDeserialized, IntersectIsSerialized } from "./utils";

export type MergeObjectPropsToSerializable<
  V extends Record<string, Type>,
  R extends string,
  P extends Type,
  A extends ObjectType,
  B extends SerializableType,
> = $MergeObjectPropsToSerializable<V, R, P, A, B>;

type $MergeObjectPropsToSerializable<
  V,
  R,
  P,
  A extends ObjectType,
  B extends SerializableType,
> = _$Object<V, R, P, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;

export type IntersectObject<A extends ObjectType, B> = B extends Type
  ? B extends NeverType
    ? B
    : B extends AnyType
    ? MergeObjectPropsToSerializable<
        ObjectValues<A>,
        ObjectRequiredKeys<A>,
        ObjectOpenProps<A>,
        A,
        B
      >
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
  V extends Record<string, unknown> = IntersectObjectsValues<A, B>,
  O = Intersect<ObjectOpenProps<A>, ObjectOpenProps<B>>,
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
