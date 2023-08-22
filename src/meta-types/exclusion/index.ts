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
export type _Exclude<A extends Type, B extends Type> = _$Exclude<A, B>;

export type _$Exclude<A, B> = A extends NeverType
  ? A
  : A extends AnyType
  ? ExcludeFromAny<A, B>
  : A extends ConstType
  ? ExcludeFromConst<A, B>
  : A extends EnumType
  ? ExcludeFromEnum<A, B>
  : A extends PrimitiveType
  ? ExcludeFromPrimitive<A, B>
  : A extends ArrayType
  ? ExcludeFromArray<A, B>
  : A extends TupleType
  ? ExcludeFromTuple<A, B>
  : A extends ObjectType
  ? ExcludeFromObject<A, B>
  : A extends UnionType
  ? DistributeUnion<A, B>
  : Never;
