import type { Any, AnyType } from "../any";
import type { ArrayType, ArrayValues } from "../array";
import type { ConstType } from "../const";
import type { EnumType, EnumValues } from "../enum";
import type { Never, NeverType } from "../never";
import type {
  ObjectOpenProps,
  ObjectRequiredKeys,
  ObjectType,
  ObjectValues,
} from "../object";
import type { PrimitiveType } from "../primitive";
import type { TupleOpenProps, TupleType, TupleValues } from "../tuple";
import type { Type } from "../type";
import type { UnionType } from "../union";
import type { MergeArrayValuesToSerializable } from "./array";
import type { MergeConstToSerializable } from "./const";
import type { MergeEnumValuesToSerializable } from "./enum";
import type { MergeObjectPropsToSerializable } from "./object";
import type { MergePrimitiveToSerializable } from "./primitive";
import type { MergeTuplePropsToSerializable } from "./tuple";
import type { DistributeIntersection } from "./union";
import type { IntersectDeserialized, IntersectIsSerialized } from "./utils";

export type IntersectAny<A extends AnyType, B> = B extends Type
  ? B extends NeverType
    ? B
    : B extends AnyType
    ? Any<IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>
    : B extends ConstType
    ? MergeConstToSerializable<B, A>
    : B extends EnumType
    ? MergeEnumValuesToSerializable<EnumValues<B>, B, A>
    : B extends PrimitiveType
    ? MergePrimitiveToSerializable<B, A>
    : B extends ArrayType
    ? MergeArrayValuesToSerializable<ArrayValues<B>, B, A>
    : B extends TupleType
    ? MergeTuplePropsToSerializable<TupleValues<B>, TupleOpenProps<B>, B, A>
    : B extends ObjectType
    ? MergeObjectPropsToSerializable<
        ObjectValues<B>,
        ObjectRequiredKeys<B>,
        ObjectOpenProps<B>,
        B,
        A
      >
    : B extends UnionType
    ? DistributeIntersection<B, A>
    : Never
  : Never;
