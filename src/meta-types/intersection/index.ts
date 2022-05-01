import { Never, NeverType } from "../never";
import { AnyType } from "../any";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { Type } from "../type";

import { IntersectAny } from "./any";
import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { IntersectPrimitive } from "./primitive";
import { IntersectArray } from "./array";
import { IntersectTuple } from "./tuple";
import { IntersectObject } from "./object";
import { IntersectUnion } from "./union";

export type Intersect<A extends Type, B extends Type> = $Intersect<A, B>;

export type $Intersect<A, B> = A extends NeverType
  ? A
  : A extends AnyType
  ? IntersectAny<A, B>
  : A extends ConstType
  ? IntersectConst<A, B>
  : A extends EnumType
  ? IntersectEnum<A, B>
  : A extends PrimitiveType
  ? IntersectPrimitive<A, B>
  : A extends ArrayType
  ? IntersectArray<A, B>
  : A extends TupleType
  ? IntersectTuple<A, B>
  : A extends ObjectType
  ? IntersectObject<A, B>
  : A extends UnionType
  ? IntersectUnion<A, B>
  : Never;
