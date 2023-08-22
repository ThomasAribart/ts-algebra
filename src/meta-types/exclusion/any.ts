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
import type { ExcludeUnion } from "./union";

export type ExcludeFromAny<A extends AnyType, B> = B extends Type
  ? B extends NeverType
    ? A
    : B extends AnyType
    ? Never
    : B extends ConstType
    ? A
    : B extends EnumType
    ? A
    : B extends PrimitiveType
    ? A
    : B extends ArrayType
    ? A
    : B extends TupleType
    ? A
    : B extends ObjectType
    ? A
    : B extends UnionType
    ? ExcludeUnion<A, B>
    : Never
  : Never;
