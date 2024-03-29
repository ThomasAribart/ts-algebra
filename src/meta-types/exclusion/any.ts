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

/**
 * Excludes from an `Any` meta-type any other meta-type
 * @param META_ANY AnyType
 * @param META_TYPE MetaType
 * @returns MetaType
 */
export type ExcludeFromAny<
  META_ANY extends AnyType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_ANY
    : META_TYPE extends AnyType
    ? Never
    : META_TYPE extends ConstType
    ? META_ANY
    : META_TYPE extends EnumType
    ? META_ANY
    : META_TYPE extends PrimitiveType
    ? META_ANY
    : META_TYPE extends ArrayType
    ? META_ANY
    : META_TYPE extends TupleType
    ? META_ANY
    : META_TYPE extends ObjectType
    ? META_ANY
    : META_TYPE extends UnionType
    ? ExcludeUnion<META_ANY, META_TYPE>
    : Never
  : Never;
