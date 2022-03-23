import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { Type } from "../type";

import { ExcludeUnion } from "./union";

export type ExcludeFromAny<A extends AnyType, B> = B extends Type
  ? B extends AnyType
    ? Never
    : B extends NeverType
    ? A
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
