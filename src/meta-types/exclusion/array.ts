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

export type ExcludeFromArray<A extends ArrayType, B> = B extends Type
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
    ? ExcludeArrays<A, B>
    : B extends TupleType
    ? And<DoesExtend<TupleValues<B>, []>, IsTupleOpen<B>> extends true
      ? ExcludeArrays<A, _Array<TupleOpenProps<B>>>
      : A
    : B extends ObjectType
    ? A
    : B extends UnionType
    ? ExcludeUnion<A, B>
    : Never
  : Never;

type ExcludeArrays<A extends ArrayType, B extends ArrayType> = _Exclude<
  ArrayValues<A>,
  ArrayValues<B>
> extends NeverType
  ? NeverType
  : A;
