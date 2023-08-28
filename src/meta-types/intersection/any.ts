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

export type IntersectAny<
  META_ANY extends AnyType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_TYPE
    : META_TYPE extends AnyType
    ? Any<
        IntersectIsSerialized<META_ANY, META_TYPE>,
        IntersectDeserialized<META_ANY, META_TYPE>
      >
    : META_TYPE extends ConstType
    ? MergeConstToSerializable<META_TYPE, META_ANY>
    : META_TYPE extends EnumType
    ? MergeEnumValuesToSerializable<EnumValues<META_TYPE>, META_TYPE, META_ANY>
    : META_TYPE extends PrimitiveType
    ? MergePrimitiveToSerializable<META_TYPE, META_ANY>
    : META_TYPE extends ArrayType
    ? MergeArrayValuesToSerializable<
        ArrayValues<META_TYPE>,
        META_TYPE,
        META_ANY
      >
    : META_TYPE extends TupleType
    ? MergeTuplePropsToSerializable<
        TupleValues<META_TYPE>,
        TupleOpenProps<META_TYPE>,
        META_TYPE,
        META_ANY
      >
    : META_TYPE extends ObjectType
    ? MergeObjectPropsToSerializable<
        ObjectValues<META_TYPE>,
        ObjectRequiredKeys<META_TYPE>,
        ObjectOpenProps<META_TYPE>,
        META_TYPE,
        META_ANY
      >
    : META_TYPE extends UnionType
    ? DistributeIntersection<META_TYPE, META_ANY>
    : Never
  : Never;
