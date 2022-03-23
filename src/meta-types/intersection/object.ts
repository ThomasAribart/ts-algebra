import { And, Not, DoesExtend } from "../../utils";

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
  IsObjectOpen,
  ObjectOpenProps,
} from "../object";
import { UnionType } from "../union";
import { Type } from "../type";

import { Intersect, $Intersect } from "./index";
import { IntersectConstToObject } from "./const";
import { IntersectEnumToObject } from "./enum";
import { DistributeIntersection } from "./union";

export type IntersectObject<A extends ObjectType, B> = B extends Type
  ? B extends AnyType
    ? A
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
  O extends any = Intersect<ObjectOpenProps<A>, ObjectOpenProps<B>>
> = _$Object<
  {
    [key in keyof V]: V[key];
  },
  ObjectRequiredKeys<A> | ObjectRequiredKeys<B>,
  And<And<IsObjectOpen<A>, IsObjectOpen<B>>, Not<DoesExtend<O, Never>>>,
  O
>;

type IntersectObjectsValues<A extends ObjectType, B extends ObjectType> = {
  [key in Extract<
    keyof ObjectValues<A> | keyof ObjectValues<B>,
    string
  >]: $Intersect<ObjectValue<A, key>, ObjectValue<B, key>>;
};
