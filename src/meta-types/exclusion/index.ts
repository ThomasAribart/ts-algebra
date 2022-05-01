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

import { ExcludeFromAny } from "./any";
import { ExcludeFromConst } from "./const";
import { ExcludeFromEnum } from "./enum";
import { ExcludeFromPrimitive } from "./primitive";
import { ExcludeFromArray } from "./array";
import { ExcludeFromTuple } from "./tuple";
import { ExcludeFromObject } from "./object";
import { DistributeUnion } from "./union";

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
