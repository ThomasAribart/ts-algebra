import type { AnyType } from "../any";
import type { ArrayType } from "../array";
import type { ConstType } from "../const";
import type { EnumType } from "../enum";
import type { Never, NeverType } from "../never";
import type { ObjectType } from "../object";
import type { PrimitiveType, PrimitiveValue } from "../primitive";
import type { TupleType } from "../tuple";
import type { Type } from "../type";
import type { UnionType } from "../union";
import type { ExcludeUnion } from "./union";

/**
 * Excludes from a `Primitive` meta-type any other meta-type
 * @param META_PRIMITIVE PrimitiveType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
export type ExcludeFromPrimitive<
  META_PRIMITIVE extends PrimitiveType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_PRIMITIVE
    : META_TYPE extends AnyType
    ? Never
    : META_TYPE extends ConstType
    ? META_PRIMITIVE
    : META_TYPE extends EnumType
    ? META_PRIMITIVE
    : META_TYPE extends PrimitiveType
    ? PrimitiveValue<META_PRIMITIVE> extends PrimitiveValue<META_TYPE>
      ? Never
      : META_PRIMITIVE
    : META_TYPE extends ArrayType
    ? META_PRIMITIVE
    : META_TYPE extends TupleType
    ? META_PRIMITIVE
    : META_TYPE extends ObjectType
    ? META_PRIMITIVE
    : META_TYPE extends UnionType
    ? ExcludeUnion<META_PRIMITIVE, META_TYPE>
    : Never
  : Never;
