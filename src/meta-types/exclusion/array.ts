import type { And, DoesExtend } from "~/utils";

import type { AnyType } from "../any";
import type { _Array, ArrayType, ArrayValues } from "../array";
import type { ConstType } from "../const";
import type { EnumType } from "../enum";
import type { Never, NeverType } from "../never";
import type { ObjectType } from "../object";
import type { PrimitiveType } from "../primitive";
import type {
  IsTupleOpen,
  TupleOpenProps,
  TupleType,
  TupleValues,
} from "../tuple";
import type { Type } from "../type";
import type { UnionType } from "../union";
import type { _Exclude } from "./index";
import type { ExcludeUnion } from "./union";

export type ExcludeFromArray<
  META_ARRAY extends ArrayType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_ARRAY
    : META_TYPE extends AnyType
    ? Never
    : META_TYPE extends ConstType
    ? META_ARRAY
    : META_TYPE extends EnumType
    ? META_ARRAY
    : META_TYPE extends PrimitiveType
    ? META_ARRAY
    : META_TYPE extends ArrayType
    ? ExcludeArrays<META_ARRAY, META_TYPE>
    : META_TYPE extends TupleType
    ? And<
        DoesExtend<TupleValues<META_TYPE>, []>,
        IsTupleOpen<META_TYPE>
      > extends true
      ? ExcludeArrays<META_ARRAY, _Array<TupleOpenProps<META_TYPE>>>
      : META_ARRAY
    : META_TYPE extends ObjectType
    ? META_ARRAY
    : META_TYPE extends UnionType
    ? ExcludeUnion<META_ARRAY, META_TYPE>
    : Never
  : Never;

type ExcludeArrays<
  META_ARRAY_A extends ArrayType,
  META_ARRAY_B extends ArrayType,
> = _Exclude<
  ArrayValues<META_ARRAY_A>,
  ArrayValues<META_ARRAY_B>
> extends NeverType
  ? NeverType
  : META_ARRAY_A;
