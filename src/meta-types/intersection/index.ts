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

/**
 * Intersects two meta-types
 * @param META_TYPE_A MetaType
 * @param META_TYPE_B MetaType
 * @returns MetaType
 */
export type Intersect<
  META_TYPE_A extends Type,
  META_TYPE_B extends Type,
> = $Intersect<META_TYPE_A, META_TYPE_B>;

/**
 * Intersects two meta-types (without type constraints)
 * @param META_TYPE_A MetaType
 * @param META_TYPE_B MetaType
 * @returns MetaType
 */
export type $Intersect<META_TYPE_A, META_TYPE_B> = META_TYPE_A extends NeverType
  ? META_TYPE_A
  : META_TYPE_A extends AnyType
  ? IntersectAny<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends ConstType
  ? IntersectConst<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends EnumType
  ? IntersectEnum<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends PrimitiveType
  ? IntersectPrimitive<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends ArrayType
  ? IntersectArray<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends TupleType
  ? IntersectTuple<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends ObjectType
  ? IntersectObject<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends UnionType
  ? IntersectUnion<META_TYPE_A, META_TYPE_B>
  : Never;
