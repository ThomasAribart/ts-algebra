import type { AnyType } from "../any";
import type { ArrayType } from "../array";
import type { ConstType } from "../const";
import type { EnumType } from "../enum";
import type { Never, NeverType } from "../never";
import type { ObjectType } from "../object";
import type { PrimitiveType } from "../primitive";
import type { TupleType } from "../tuple";
import type { Type } from "../type";
import type { UnionType } from "../union";
import type { IntersectAny } from "./any";
import type { IntersectArray } from "./array";
import type { IntersectConst } from "./const";
import type { IntersectEnum } from "./enum";
import type { IntersectObject } from "./object";
import type { IntersectPrimitive } from "./primitive";
import type { IntersectTuple } from "./tuple";
import type { IntersectUnion } from "./union";

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
