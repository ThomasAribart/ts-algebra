import { Any, AnyType } from "../any";
import { Never, NeverType } from "../never";
import { ConstType } from "../const";
import { EnumType, EnumValues } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType, ArrayValues } from "../array";
import { TupleType, TupleValues, TupleOpenProps } from "../tuple";
import {
  ObjectType,
  ObjectValues,
  ObjectRequiredKeys,
  ObjectOpenProps,
} from "../object";
import { UnionType } from "../union";
import { Type } from "../type";

import { MergeConstToSerializable } from "./const";
import { MergeEnumValuesToSerializable } from "./enum";
import { MergePrimitiveToSerializable } from "./primitive";
import { MergeArrayValuesToSerializable } from "./array";
import { MergeTuplePropsToSerializable } from "./tuple";
import { MergeObjectPropsToSerializable } from "./object";
import { DistributeIntersection } from "./union";
import { IntersectIsSerialized, IntersectDeserialized } from "./utils";

export type IntersectAny<A extends AnyType, B> = B extends Type
  ? B extends AnyType
    ? Any<IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>
    : B extends NeverType
    ? Never
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
