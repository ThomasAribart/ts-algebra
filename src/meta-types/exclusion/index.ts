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
import type { ExcludeFromAny } from "./any";
import type { ExcludeFromArray } from "./array";
import type { ExcludeFromConst } from "./const";
import type { ExcludeFromEnum } from "./enum";
import type { ExcludeFromObject } from "./object";
import type { ExcludeFromPrimitive } from "./primitive";
import type { ExcludeFromTuple } from "./tuple";
import type { ExcludeFromUnion } from "./union";

/**
 * Excludes from a meta-type (source) another meta-type (excluded)
 * @param META_TYPE_A MetaType
 * @param META_TYPE_B MetaType
 * @returns MetaType
 */
export type _Exclude<
  // ☝️ Prefixed with _ to not confuse with native TS Exclude
  META_TYPE_A extends Type,
  META_TYPE_B extends Type,
> = _$Exclude<META_TYPE_A, META_TYPE_B>;

/**
 * Excludes from a meta-type (source) an meta-type (excluded) (without type constraints)
 * @param META_TYPE_A MetaType
 * @param META_TYPE_B MetaType
 * @returns MetaType
 */
export type _$Exclude<META_TYPE_A, META_TYPE_B> = META_TYPE_A extends NeverType
  ? META_TYPE_A
  : META_TYPE_A extends AnyType
  ? ExcludeFromAny<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends ConstType
  ? ExcludeFromConst<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends EnumType
  ? ExcludeFromEnum<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends PrimitiveType
  ? ExcludeFromPrimitive<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends ArrayType
  ? ExcludeFromArray<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends TupleType
  ? ExcludeFromTuple<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends ObjectType
  ? ExcludeFromObject<META_TYPE_A, META_TYPE_B>
  : META_TYPE_A extends UnionType
  ? ExcludeFromUnion<META_TYPE_A, META_TYPE_B>
  : Never;
