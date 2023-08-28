import type { AnyType } from "../any";
import type { ArrayType } from "../array";
import type { ConstType } from "../const";
import type { EnumType } from "../enum";
import type { Never, NeverType } from "../never";
import type {
  _$Object,
  ObjectOpenProps,
  ObjectRequiredKeys,
  ObjectType,
  ObjectValue,
  ObjectValues,
} from "../object";
import type { PrimitiveType } from "../primitive";
import type { TupleType } from "../tuple";
import type { SerializableType, Type } from "../type";
import type { UnionType } from "../union";
import type { IntersectConstToObject } from "./const";
import type { IntersectEnumToObject } from "./enum";
import type { $Intersect, Intersect } from "./index";
import type { DistributeIntersection } from "./union";
import type { IntersectDeserialized, IntersectIsSerialized } from "./utils";

export type MergeObjectPropsToSerializable<
  VALUES extends Record<string, Type>,
  REQUIRED_KEYS extends string,
  OPEN_PROPS extends Type,
  META_OBJECT extends ObjectType,
  SERIALIZABLE_META_TYPE extends SerializableType,
> = $MergeObjectPropsToSerializable<
  VALUES,
  REQUIRED_KEYS,
  OPEN_PROPS,
  META_OBJECT,
  SERIALIZABLE_META_TYPE
>;

type $MergeObjectPropsToSerializable<
  VALUES,
  REQUIRED_KEYS,
  OPEN_PROPS,
  META_OBJECT extends ObjectType,
  SERIALIZABLE_META_TYPE extends SerializableType,
> = _$Object<
  VALUES,
  REQUIRED_KEYS,
  OPEN_PROPS,
  IntersectIsSerialized<META_OBJECT, SERIALIZABLE_META_TYPE>,
  IntersectDeserialized<META_OBJECT, SERIALIZABLE_META_TYPE>
>;

export type IntersectObject<
  META_OBJECT extends ObjectType,
  META_TYPE,
> = META_TYPE extends Type
  ? META_TYPE extends NeverType
    ? META_TYPE
    : META_TYPE extends AnyType
    ? MergeObjectPropsToSerializable<
        ObjectValues<META_OBJECT>,
        ObjectRequiredKeys<META_OBJECT>,
        ObjectOpenProps<META_OBJECT>,
        META_OBJECT,
        META_TYPE
      >
    : META_TYPE extends ConstType
    ? IntersectConstToObject<META_TYPE, META_OBJECT>
    : META_TYPE extends EnumType
    ? IntersectEnumToObject<META_TYPE, META_OBJECT>
    : META_TYPE extends PrimitiveType
    ? Never
    : META_TYPE extends ArrayType
    ? Never
    : META_TYPE extends TupleType
    ? Never
    : META_TYPE extends ObjectType
    ? IntersectObjects<META_OBJECT, META_TYPE>
    : META_TYPE extends UnionType
    ? DistributeIntersection<META_TYPE, META_OBJECT>
    : Never
  : Never;

type IntersectObjects<
  META_OBJECT_A extends ObjectType,
  META_OBJECT_B extends ObjectType,
  INTERSECTED_VALUES extends Record<string, unknown> = IntersectObjectsValues<
    META_OBJECT_A,
    META_OBJECT_B
  >,
  INTERSECTED_OPEN_PROPS = Intersect<
    ObjectOpenProps<META_OBJECT_A>,
    ObjectOpenProps<META_OBJECT_B>
  >,
> = $MergeObjectPropsToSerializable<
  {
    [KEY in keyof INTERSECTED_VALUES]: INTERSECTED_VALUES[KEY];
  },
  ObjectRequiredKeys<META_OBJECT_A> | ObjectRequiredKeys<META_OBJECT_B>,
  INTERSECTED_OPEN_PROPS,
  META_OBJECT_A,
  META_OBJECT_B
>;

type IntersectObjectsValues<
  META_OBJECT_A extends ObjectType,
  META_OBJECT_B extends ObjectType,
> = {
  [KEY in Extract<
    keyof ObjectValues<META_OBJECT_A> | keyof ObjectValues<META_OBJECT_B>,
    string
  >]: $Intersect<
    ObjectValue<META_OBJECT_A, KEY>,
    ObjectValue<META_OBJECT_B, KEY>
  >;
};
