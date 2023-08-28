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
import type { DistributeUnion } from "./union";

// Prefixed with _ to not confuse with native TS Exclude
export type _Exclude<
  META_TYPE_A extends Type,
  META_TYPE_B extends Type,
> = _$Exclude<META_TYPE_A, META_TYPE_B>;

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
  ? DistributeUnion<META_TYPE_A, META_TYPE_B>
  : Never;
