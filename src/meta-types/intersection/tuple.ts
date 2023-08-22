import type { AnyType } from "../any";
import type { ArrayType, ArrayValues } from "../array";
import type { ConstType } from "../const";
import type { EnumType } from "../enum";
import type { Never, NeverType } from "../never";
import type { ObjectType } from "../object";
import type { PrimitiveType } from "../primitive";
import type {
  $Tuple,
  IsTupleOpen,
  TupleOpenProps,
  TupleType,
  TupleValues,
} from "../tuple";
import type { SerializableType, Type } from "../type";
import type { UnionType } from "../union";
import type { IntersectConstToTuple } from "./const";
import type { IntersectEnumToTuple } from "./enum";
import type { $Intersect, Intersect } from "./index";
import type { DistributeIntersection } from "./union";
import type { IntersectDeserialized, IntersectIsSerialized } from "./utils";

export type MergeTuplePropsToSerializable<
  V extends Type[],
  P extends Type,
  A extends TupleType,
  B extends SerializableType,
> = $MergeTuplePropsToSerializable<V, P, A, B>;

type $MergeTuplePropsToSerializable<
  V,
  P,
  A extends TupleType,
  B extends SerializableType,
> = $Tuple<V, P, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;

export type IntersectTuple<A extends TupleType, B> = B extends NeverType
  ? B
  : B extends AnyType
  ? MergeTuplePropsToSerializable<TupleValues<A>, TupleOpenProps<A>, A, B>
  : B extends ConstType
  ? IntersectConstToTuple<B, A>
  : B extends EnumType
  ? IntersectEnumToTuple<B, A>
  : B extends PrimitiveType
  ? Never
  : B extends ArrayType
  ? IntersectTupleToArray<A, B>
  : B extends TupleType
  ? IntersectTuples<A, B>
  : B extends ObjectType
  ? Never
  : B extends UnionType
  ? DistributeIntersection<B, A>
  : Never;

export type IntersectTupleToArray<
  T extends TupleType,
  A extends ArrayType,
  V extends unknown[] = IntersectTupleToArrayValues<
    TupleValues<T>,
    ArrayValues<A>
  >,
  O = $Intersect<TupleOpenProps<T>, ArrayValues<A>>,
> = $MergeTuplePropsToSerializable<V, O, T, A>;

type IntersectTupleToArrayValues<
  V extends Type[],
  T extends Type,
  R extends unknown[] = [],
> = V extends [infer H, ...infer Tl]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends Type
    ? Tl extends Type[]
      ? IntersectTupleToArrayValues<Tl, T, [...R, Intersect<H, T>]>
      : never
    : never
  : R;

type IntersectTuples<
  A extends TupleType,
  B extends TupleType,
  V extends unknown[] = IntersectTupleValues<
    TupleValues<A>,
    TupleValues<B>,
    IsTupleOpen<A>,
    IsTupleOpen<B>,
    TupleOpenProps<A>,
    TupleOpenProps<B>
  >,
  O = $Intersect<TupleOpenProps<A>, TupleOpenProps<B>>,
> = $MergeTuplePropsToSerializable<V, O, A, B>;

type IntersectTupleValues<
  V1 extends Type[],
  V2 extends Type[],
  O1 extends boolean,
  O2 extends boolean,
  P1 extends Type,
  P2 extends Type,
  R extends unknown[] = [],
> = V1 extends [infer H1, ...infer T1]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H1 extends Type
    ? T1 extends Type[]
      ? V2 extends [infer H2, ...infer T2]
        ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
          H2 extends Type
          ? T2 extends Type[]
            ? IntersectTupleValues<
                T1,
                T2,
                O1,
                O2,
                P1,
                P2,
                [...R, Intersect<H1, H2>]
              >
            : never
          : never
        : IntersectTupleValues<
            T1,
            V2,
            O1,
            O2,
            P1,
            P2,
            [...R, O2 extends true ? Intersect<H1, P2> : Never]
          >
      : never
    : never
  : V2 extends [infer H2, ...infer T2]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H2 extends Type
    ? T2 extends Type[]
      ? IntersectTupleValues<
          V1,
          T2,
          O1,
          O2,
          P1,
          P2,
          [...R, O1 extends true ? Intersect<H2, P1> : Never]
        >
      : never
    : never
  : R;
