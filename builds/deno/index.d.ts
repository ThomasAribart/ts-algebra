import { If as If$1, IsNever as IsNever$1, And, DoesExtend as DoesExtend$1, Not, DeepMergeUnsafe, Prettify, Or, IsObject, UnionLast as UnionLast$1, UnionPop, Tail } from '~/utils';

declare type NeverTypeId = "never";
declare type Never = {
    type: NeverTypeId;
};
declare type NeverType = Never;
declare type ResolveNever = never;

declare type IsSerialized<SERIALIZABLE_META_TYPE extends SerializableType> = SERIALIZABLE_META_TYPE["isSerialized"];
declare type Deserialized<SERIALIZABLE_META_TYPE extends SerializableType> = SERIALIZABLE_META_TYPE["deserialized"];

declare type ConstTypeId = "const";
declare type Const<VALUE, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = If$1<IsNever$1<VALUE>, Never, {
    type: ConstTypeId;
    value: VALUE;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
}>;
declare type ConstType = {
    type: ConstTypeId;
    value: unknown;
    isSerialized: boolean;
    deserialized: unknown;
};
declare type ConstValue<META_CONST extends ConstType> = META_CONST["value"];
declare type ResolveConst<META_CONST extends ConstType, OPTIONS extends ResolveOptions> = If$1<And<OPTIONS["deserialize"], IsSerialized<META_CONST>>, Deserialized<META_CONST>, ConstValue<META_CONST>>;

declare type EnumTypeId = "enum";
declare type Enum<VALUES, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = If$1<IsNever$1<VALUES>, Never, {
    type: EnumTypeId;
    values: VALUES;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
}>;
declare type EnumType = {
    type: EnumTypeId;
    values: unknown;
    isSerialized: boolean;
    deserialized: unknown;
};
declare type EnumValues<META_ENUM extends EnumType> = META_ENUM["values"];
declare type ResolveEnum<META_ENUM extends EnumType, OPTIONS extends ResolveOptions> = If$1<And<OPTIONS["deserialize"], IsSerialized<META_ENUM>>, Deserialized<META_ENUM>, EnumValues<META_ENUM>>;

declare type ObjectTypeId = "object";
declare type _Object<VALUES extends Record<string, Type> = {}, REQUIRED_KEYS extends string = never, OPEN_PROPS extends Type = Never, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = _$Object<VALUES, REQUIRED_KEYS, OPEN_PROPS, IS_SERIALIZED, DESERIALIZED>;
declare type _$Object<VALUES = {}, REQUIRED_KEYS = never, OPEN_PROPS = Never, IS_SERIALIZED = false, DESERIALIZED = never> = DoesExtend$1<true, {
    [KEY in Extract<REQUIRED_KEYS, string>]: KEY extends keyof VALUES ? DoesExtend$1<VALUES[KEY], NeverType> : DoesExtend$1<OPEN_PROPS, NeverType>;
}[Extract<REQUIRED_KEYS, string>]> extends true ? Never : {
    type: ObjectTypeId;
    values: VALUES;
    required: REQUIRED_KEYS;
    isOpen: Not<DoesExtend$1<OPEN_PROPS, NeverType>>;
    openProps: OPEN_PROPS;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
};
declare type ObjectType = {
    type: ObjectTypeId;
    values: Record<string, Type>;
    required: string;
    isOpen: boolean;
    openProps: Type;
    isSerialized: boolean;
    deserialized: unknown;
};
declare type ObjectValues<META_OBJECT extends ObjectType> = META_OBJECT["values"];
declare type ObjectValue<META_OBJECT extends ObjectType, KEY extends string> = KEY extends keyof ObjectValues<META_OBJECT> ? ObjectValues<META_OBJECT>[KEY] : IsObjectOpen<META_OBJECT> extends true ? ObjectOpenProps<META_OBJECT> : Never;
declare type ObjectRequiredKeys<META_OBJECT extends ObjectType> = META_OBJECT["required"];
declare type IsObjectOpen<META_OBJECT extends ObjectType> = META_OBJECT["isOpen"];
declare type ObjectOpenProps<META_OBJECT extends ObjectType> = META_OBJECT["openProps"];
declare type IsObjectEmpty<META_OBJECT extends ObjectType> = IsNever$1<keyof ObjectValues<META_OBJECT>>;
declare type ResolveObject<META_OBJECT extends ObjectType, OPTIONS extends ResolveOptions> = If$1<And<OPTIONS["deserialize"], IsSerialized<META_OBJECT>>, Deserialized<META_OBJECT>, DeepMergeUnsafe<If$1<IsObjectOpen<META_OBJECT>, If$1<IsObjectEmpty<META_OBJECT>, {
    [KEY: string]: Resolve<ObjectOpenProps<META_OBJECT>, OPTIONS>;
}, {
    [KEY: string]: Resolve<Any, OPTIONS>;
}>, {}>, DeepMergeUnsafe<{
    [KEY in Exclude<keyof ObjectValues<META_OBJECT>, ObjectRequiredKeys<META_OBJECT>>]?: Resolve<ObjectValues<META_OBJECT>[KEY], OPTIONS>;
}, {
    [KEY in ObjectRequiredKeys<META_OBJECT>]: KEY extends keyof ObjectValues<META_OBJECT> ? Resolve<ObjectValues<META_OBJECT>[KEY], OPTIONS> : Resolve<Any, OPTIONS>;
}>>>;

declare type PrimitiveTypeId = "primitive";
declare type Primitive<VALUE extends null | boolean | number | string, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = $Primitive<VALUE, IS_SERIALIZED, DESERIALIZED>;
declare type $Primitive<VALUE, IS_SERIALIZED = false, DESERIALIZED = never> = If$1<IsNever$1<VALUE>, Never, {
    type: PrimitiveTypeId;
    value: VALUE;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
}>;
declare type PrimitiveType = {
    type: PrimitiveTypeId;
    value: null | boolean | number | string;
    isSerialized: boolean;
    deserialized: unknown;
};
declare type PrimitiveValue<META_PRIMITIVE extends PrimitiveType> = META_PRIMITIVE["value"];
declare type ResolvePrimitive<META_PRIMITIVE extends PrimitiveType, OPTIONS extends ResolveOptions> = If$1<And<OPTIONS["deserialize"], IsSerialized<META_PRIMITIVE>>, Deserialized<META_PRIMITIVE>, PrimitiveValue<META_PRIMITIVE>>;

declare type TupleTypeId = "tuple";
declare type Tuple<VALUES extends Type[], OPEN_PROPS extends Type = Never, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = $Tuple<VALUES, OPEN_PROPS, IS_SERIALIZED, DESERIALIZED>;
declare type $Tuple<VALUES, OPEN_PROPS = Never, IS_SERIALIZED = false, DESERIALIZED = never> = IsAnyValueNever<VALUES> extends true ? Never : {
    type: TupleTypeId;
    values: VALUES;
    isOpen: Not<DoesExtend$1<OPEN_PROPS, NeverType>>;
    openProps: OPEN_PROPS;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
};
declare type IsAnyValueNever<TUPLE> = TUPLE extends [
    infer TUPLE_HEAD,
    ...infer TUPLE_TAIL
] ? TUPLE_HEAD extends NeverType ? true : IsAnyValueNever<TUPLE_TAIL> : false;
declare type TupleType = {
    type: TupleTypeId;
    values: Type[];
    isOpen: boolean;
    openProps: Type;
    isSerialized: boolean;
    deserialized: unknown;
};
declare type TupleValues<META_TUPLE extends TupleType> = META_TUPLE["values"];
declare type IsTupleOpen<META_TUPLE extends TupleType> = META_TUPLE["isOpen"];
declare type TupleOpenProps<META_TUPLE extends TupleType> = META_TUPLE["openProps"];
declare type ResolveTuple<META_TUPLE extends TupleType, OPTIONS extends ResolveOptions> = If$1<And<OPTIONS["deserialize"], IsSerialized<META_TUPLE>>, Deserialized<META_TUPLE>, If$1<IsTupleOpen<META_TUPLE>, [
    ...RecurseOnTuple<TupleValues<META_TUPLE>, OPTIONS>,
    ...Resolve<TupleOpenProps<META_TUPLE>, OPTIONS>[]
], RecurseOnTuple<TupleValues<META_TUPLE>, OPTIONS>>>;
declare type RecurseOnTuple<VALUES extends Type[], OPTIONS extends ResolveOptions, RESULT extends unknown[] = []> = VALUES extends [infer VALUES_HEAD, ...infer VALUES_TAIL] ? VALUES_HEAD extends Type ? VALUES_TAIL extends Type[] ? RecurseOnTuple<VALUES_TAIL, OPTIONS, [
    ...RESULT,
    Resolve<VALUES_HEAD, OPTIONS>
]> : never : never : RESULT;

declare type DoesExtend<TYPE_A, TYPE_B> = [TYPE_A] extends [TYPE_B] ? true : false;

declare type If<CONDITION extends boolean, THEN, ELSE = never> = CONDITION extends true ? THEN : ELSE;

declare type IntersectUnion$1<UNION> = (UNION extends unknown ? (arg: UNION) => void : never) extends (arg: infer INTERSECTION) => void ? INTERSECTION : never;

declare type IsNever<TYPE> = [TYPE] extends [never] ? true : false;

declare type UnionLast<UNION> = IntersectUnion$1<UNION extends unknown ? (x: UNION) => void : never> extends (x: infer LAST) => void ? LAST : never;

declare type UnionTypeId = "union";
declare type Union<VALUES extends Type> = $Union<VALUES>;
declare type $Union<VALUES> = If<IsNever<VALUES>, Never, DoesExtend<VALUES, NeverType> extends true ? Never : {
    type: UnionTypeId;
    values: VALUES;
}>;
declare type UnionType = {
    type: UnionTypeId;
    values: Type;
};
declare type UnionValues<META_UNION extends UnionType> = META_UNION["values"];
declare type ResolveUnion<META_UNION extends UnionType, OPTIONS extends ResolveOptions> = RecurseOnUnion<UnionValues<META_UNION>, OPTIONS>;
declare type RecurseOnUnion<VALUES extends Type, OPTIONS extends ResolveOptions> = VALUES extends infer META_TYPE ? $Resolve<META_TYPE, OPTIONS> : never;

declare type Type = NeverType | AnyType | ConstType | EnumType | PrimitiveType | ArrayType | TupleType | ObjectType | UnionType;
declare type SerializableType = Type extends infer META_TYPE ? META_TYPE extends {
    isSerialized: boolean;
    deserialized: unknown;
} ? META_TYPE : never : never;

declare type ArrayTypeId = "array";
declare type _Array<VALUES extends Type = Any, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = _$Array<VALUES, IS_SERIALIZED, DESERIALIZED>;
declare type _$Array<VALUES = Any, IS_SERIALIZED = false, DESERIALIZED = never> = {
    type: ArrayTypeId;
    values: VALUES;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
};
declare type ArrayType = {
    type: ArrayTypeId;
    values: Type;
    isSerialized: boolean;
    deserialized: unknown;
};
declare type ArrayValues<META_ARRAY extends ArrayType> = META_ARRAY["values"];
declare type ResolveArray<META_ARRAY extends ArrayType, OPTIONS extends ResolveOptions> = If$1<And<OPTIONS["deserialize"], IsSerialized<META_ARRAY>>, Deserialized<META_ARRAY>, ArrayValues<META_ARRAY> extends NeverType ? [] : Prettify<Resolve<ArrayValues<META_ARRAY>, OPTIONS>[]>>;

declare type ResolveOptions = {
    deserialize: boolean;
};
declare type ResolveDefaultOptions = {
    deserialize: true;
};
declare type Resolve<META_TYPE extends Type, OPTIONS extends ResolveOptions = ResolveDefaultOptions> = $Resolve<META_TYPE, OPTIONS>;
declare type $Resolve<META_TYPE, OPTIONS extends ResolveOptions = ResolveDefaultOptions> = META_TYPE extends AnyType ? ResolveAny<META_TYPE, OPTIONS> : META_TYPE extends NeverType ? ResolveNever : META_TYPE extends ConstType ? ResolveConst<META_TYPE, OPTIONS> : META_TYPE extends EnumType ? ResolveEnum<META_TYPE, OPTIONS> : META_TYPE extends PrimitiveType ? ResolvePrimitive<META_TYPE, OPTIONS> : META_TYPE extends ArrayType ? ResolveArray<META_TYPE, OPTIONS> : META_TYPE extends TupleType ? ResolveTuple<META_TYPE, OPTIONS> : META_TYPE extends ObjectType ? ResolveObject<META_TYPE, OPTIONS> : META_TYPE extends UnionType ? ResolveUnion<META_TYPE, OPTIONS> : never;

declare type AnyTypeId = "any";
declare type Any<IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = {
    type: AnyTypeId;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
};
declare type AnyType = {
    type: AnyTypeId;
    isSerialized: boolean;
    deserialized: unknown;
};
declare type ResolveAny<META_ANY extends AnyType, OPTIONS extends ResolveOptions> = If$1<And<OPTIONS["deserialize"], IsSerialized<META_ANY>>, Deserialized<META_ANY>, unknown>;

declare type IntersectUnion<META_UNION extends UnionType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_TYPE : META_TYPE extends AnyType ? META_UNION : META_TYPE extends ConstType ? DistributeIntersection<META_UNION, META_TYPE> : META_TYPE extends EnumType ? DistributeIntersection<META_UNION, META_TYPE> : META_TYPE extends PrimitiveType ? DistributeIntersection<META_UNION, META_TYPE> : META_TYPE extends ArrayType ? DistributeIntersection<META_UNION, META_TYPE> : META_TYPE extends TupleType ? DistributeIntersection<META_UNION, META_TYPE> : META_TYPE extends ObjectType ? DistributeIntersection<META_UNION, META_TYPE> : META_TYPE extends UnionType ? DistributeIntersection<META_UNION, META_TYPE> : Never : Never;
declare type DistributeIntersection<META_UNION extends UnionType, META_TYPE> = $Union<RecurseOnUnionValues$1<UnionValues<META_UNION>, META_TYPE>>;
declare type RecurseOnUnionValues$1<VALUES extends Type, META_TYPE> = VALUES extends infer VALUE ? $Intersect<VALUE, META_TYPE> : never;

declare type IntersectIsSerialized<SERIALIZABLE_META_TYPE_A extends SerializableType, SERIALIZABLE_META_TYPE_B extends SerializableType> = Or<IsSerialized<SERIALIZABLE_META_TYPE_A>, IsSerialized<SERIALIZABLE_META_TYPE_B>>;
declare type IntersectDeserialized<SERIALIZABLE_META_TYPE_A extends SerializableType, SERIALIZABLE_META_TYPE_B extends SerializableType> = If$1<IsSerialized<SERIALIZABLE_META_TYPE_A>, If$1<IsSerialized<SERIALIZABLE_META_TYPE_B>, Deserialized<SERIALIZABLE_META_TYPE_A> & Deserialized<SERIALIZABLE_META_TYPE_B>, Deserialized<SERIALIZABLE_META_TYPE_A>>, If$1<IsSerialized<SERIALIZABLE_META_TYPE_B>, Deserialized<SERIALIZABLE_META_TYPE_B>>>;

declare type MergeConstToSerializable<META_CONST extends ConstType, SERIALIZABLE_META_TYPE extends SerializableType> = Const<ConstValue<META_CONST>, IntersectIsSerialized<META_CONST, SERIALIZABLE_META_TYPE>, IntersectDeserialized<META_CONST, SERIALIZABLE_META_TYPE>>;
declare type IntersectConst<META_CONST extends ConstType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_TYPE : META_TYPE extends AnyType ? MergeConstToSerializable<META_CONST, META_TYPE> : META_TYPE extends ConstType ? CheckExtendsResolved<META_CONST, META_TYPE> : META_TYPE extends EnumType ? IntersectConstToEnum<META_CONST, META_TYPE> : META_TYPE extends PrimitiveType ? IntersectConstToPrimitive<META_CONST, META_TYPE> : META_TYPE extends ArrayType ? IntersectConstToArray<META_CONST, META_TYPE> : META_TYPE extends TupleType ? IntersectConstToTuple<META_CONST, META_TYPE> : META_TYPE extends ObjectType ? IntersectConstToObject<META_CONST, META_TYPE> : META_TYPE extends UnionType ? DistributeIntersection<META_TYPE, META_CONST> : Never : Never;
declare type CheckExtendsResolved<META_CONST extends ConstType, SERIALIZABLE_META_TYPE extends SerializableType> = ConstValue<META_CONST> extends Resolve<SERIALIZABLE_META_TYPE, {
    deserialize: false;
}> ? MergeConstToSerializable<META_CONST, SERIALIZABLE_META_TYPE> : Never;
declare type IntersectConstToEnum<META_CONST extends ConstType, META_ENUM extends EnumType> = CheckExtendsResolved<META_CONST, META_ENUM>;
declare type IntersectConstToPrimitive<META_CONST extends ConstType, META_ENUM extends PrimitiveType> = CheckExtendsResolved<META_CONST, META_ENUM>;
declare type IntersectConstToArray<META_CONST extends ConstType, META_ARRAY extends ArrayType> = CheckExtendsResolved<META_CONST, META_ARRAY>;
declare type IntersectConstToTuple<META_CONST extends ConstType, META_TUPLE extends TupleType> = CheckExtendsResolved<META_CONST, META_TUPLE>;
declare type IntersectConstToObject<META_CONST extends ConstType, META_OBJECT extends ObjectType> = If$1<IsObject<ConstValue<META_CONST>>, IntersectObjectConstToObject<META_CONST, META_OBJECT>, Never>;
declare type IntersectObjectConstToObject<META_CONST extends ConstType, META_OBJECT extends ObjectType, INTERSECTED_META_OBJECT = IntersectConstValuesToObjectValues<ConstValue<META_CONST>, META_OBJECT>> = If$1<IsNever$1<NeverKeys<INTERSECTED_META_OBJECT>>, MergeConstToSerializable<META_CONST, META_OBJECT>, Never>;
declare type IntersectConstValuesToObjectValues<CONST_VALUE, META_OBJECT extends ObjectType> = {
    [KEY in Extract<keyof CONST_VALUE | ObjectRequiredKeys<META_OBJECT>, string>]: KEY extends keyof CONST_VALUE ? Intersect<Const<CONST_VALUE[KEY]>, ObjectValue<META_OBJECT, KEY>> : Never;
};
declare type NeverKeys<META_OBJECT> = {
    [KEY in keyof META_OBJECT]: META_OBJECT[KEY] extends Never ? KEY : never;
}[keyof META_OBJECT];

declare type MergeEnumValuesToSerializable<ENUM_VALUES, META_ENUM extends EnumType, SERIALIZABLE_META_TYPE extends SerializableType> = Enum<ENUM_VALUES, IntersectIsSerialized<META_ENUM, SERIALIZABLE_META_TYPE>, IntersectDeserialized<META_ENUM, SERIALIZABLE_META_TYPE>>;
declare type IntersectEnum<META_ENUM extends EnumType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_TYPE : META_TYPE extends AnyType ? MergeEnumValuesToSerializable<EnumValues<META_ENUM>, META_ENUM, META_TYPE> : META_TYPE extends ConstType ? IntersectConstToEnum<META_TYPE, META_ENUM> : META_TYPE extends EnumType ? FilterUnintersecting<META_ENUM, META_TYPE> : META_TYPE extends PrimitiveType ? IntersectEnumToPrimitive<META_ENUM, META_TYPE> : META_TYPE extends ArrayType ? FilterUnintersecting<META_ENUM, META_TYPE> : META_TYPE extends TupleType ? FilterUnintersecting<META_ENUM, META_TYPE> : META_TYPE extends ObjectType ? FilterUnintersecting<META_ENUM, META_TYPE> : META_TYPE extends UnionType ? DistributeIntersection<META_TYPE, META_ENUM> : Never : Never;
declare type FilterUnintersecting<META_ENUM extends EnumType, SERIALIZABLE_META_TYPE extends SerializableType> = MergeEnumValuesToSerializable<RecurseOnEnumValues$1<EnumValues<META_ENUM>, SERIALIZABLE_META_TYPE>, META_ENUM, SERIALIZABLE_META_TYPE>;
declare type RecurseOnEnumValues$1<ENUM_VALUES, SERIALIZABLE_META_TYPE> = ENUM_VALUES extends infer ENUM_VALUE ? $Intersect<Const<ENUM_VALUE>, SERIALIZABLE_META_TYPE> extends Never ? never : ENUM_VALUE : never;
declare type IntersectEnumToPrimitive<META_ENUM extends EnumType, META_PRIMITIVE extends PrimitiveType> = FilterUnintersecting<META_ENUM, META_PRIMITIVE>;
declare type IntersectEnumToArray<META_ENUM extends EnumType, META_ARRAY extends ArrayType> = FilterUnintersecting<META_ENUM, META_ARRAY>;
declare type IntersectEnumToTuple<META_ENUM extends EnumType, META_TUPLE extends TupleType> = FilterUnintersecting<META_ENUM, META_TUPLE>;
declare type IntersectEnumToObject<META_ENUM extends EnumType, META_OBJECT extends ObjectType> = FilterUnintersecting<META_ENUM, META_OBJECT>;

declare type MergeTuplePropsToSerializable<VALUES extends Type[], OPEN_PROPS extends Type, META_TUPLE extends TupleType, SERIALIZABLE_META_TYPE extends SerializableType> = $MergeTuplePropsToSerializable<VALUES, OPEN_PROPS, META_TUPLE, SERIALIZABLE_META_TYPE>;
declare type $MergeTuplePropsToSerializable<VALUES, OPEN_PROPS, META_TUPLE extends TupleType, SERIALIZABLE_META_TYPE extends SerializableType> = $Tuple<VALUES, OPEN_PROPS, IntersectIsSerialized<META_TUPLE, SERIALIZABLE_META_TYPE>, IntersectDeserialized<META_TUPLE, SERIALIZABLE_META_TYPE>>;
declare type IntersectTuple<META_TUPLE extends TupleType, META_TYPE> = META_TYPE extends NeverType ? META_TYPE : META_TYPE extends AnyType ? MergeTuplePropsToSerializable<TupleValues<META_TUPLE>, TupleOpenProps<META_TUPLE>, META_TUPLE, META_TYPE> : META_TYPE extends ConstType ? IntersectConstToTuple<META_TYPE, META_TUPLE> : META_TYPE extends EnumType ? IntersectEnumToTuple<META_TYPE, META_TUPLE> : META_TYPE extends PrimitiveType ? Never : META_TYPE extends ArrayType ? IntersectTupleToArray<META_TUPLE, META_TYPE> : META_TYPE extends TupleType ? IntersectTuples<META_TUPLE, META_TYPE> : META_TYPE extends ObjectType ? Never : META_TYPE extends UnionType ? DistributeIntersection<META_TYPE, META_TUPLE> : Never;
declare type IntersectTupleToArray<META_TUPLE extends TupleType, META_ARRAY extends ArrayType, INTERSECTED_VALUES extends unknown[] = IntersectTupleToArrayValues<TupleValues<META_TUPLE>, ArrayValues<META_ARRAY>>, INTERSECTED_OPEN_PROPS = $Intersect<TupleOpenProps<META_TUPLE>, ArrayValues<META_ARRAY>>> = $MergeTuplePropsToSerializable<INTERSECTED_VALUES, INTERSECTED_OPEN_PROPS, META_TUPLE, META_ARRAY>;
declare type IntersectTupleToArrayValues<TUPLE_VALUES extends Type[], ARRAY_VALUES extends Type, RESULT extends unknown[] = []> = TUPLE_VALUES extends [infer TUPLE_VALUES_HEAD, ...infer TUPLE_VALUES_TAIL] ? TUPLE_VALUES_HEAD extends Type ? TUPLE_VALUES_TAIL extends Type[] ? IntersectTupleToArrayValues<TUPLE_VALUES_TAIL, ARRAY_VALUES, [
    ...RESULT,
    Intersect<TUPLE_VALUES_HEAD, ARRAY_VALUES>
]> : never : never : RESULT;
declare type IntersectTuples<META_TUPLE_A extends TupleType, META_TUPLE_B extends TupleType, INTERSECTED_VALUES extends unknown[] = IntersectTupleValues<TupleValues<META_TUPLE_A>, TupleValues<META_TUPLE_B>, IsTupleOpen<META_TUPLE_A>, IsTupleOpen<META_TUPLE_B>, TupleOpenProps<META_TUPLE_A>, TupleOpenProps<META_TUPLE_B>>, INTERSECTED_OPEN_PROPS = $Intersect<TupleOpenProps<META_TUPLE_A>, TupleOpenProps<META_TUPLE_B>>> = $MergeTuplePropsToSerializable<INTERSECTED_VALUES, INTERSECTED_OPEN_PROPS, META_TUPLE_A, META_TUPLE_B>;
declare type IntersectTupleValues<TUPLE_A_VALUES extends Type[], TUPLE_B_VALUES extends Type[], TUPLE_A_IS_OPEN extends boolean, TUPLE_B_IS_OPEN extends boolean, TUPLE_A_OPEN_PROPS extends Type, TUPLE_B_OPEN_PROPS extends Type, RESULT extends unknown[] = []> = TUPLE_A_VALUES extends [
    infer TUPLE_A_VALUES_HEAD,
    ...infer TUPLE_A_VALUES_TAIL
] ? TUPLE_A_VALUES_HEAD extends Type ? TUPLE_A_VALUES_TAIL extends Type[] ? TUPLE_B_VALUES extends [
    infer TUPLE_B_VALUES_HEAD,
    ...infer TUPLE_B_VALUES_TAIL
] ? TUPLE_B_VALUES_HEAD extends Type ? TUPLE_B_VALUES_TAIL extends Type[] ? IntersectTupleValues<TUPLE_A_VALUES_TAIL, TUPLE_B_VALUES_TAIL, TUPLE_A_IS_OPEN, TUPLE_B_IS_OPEN, TUPLE_A_OPEN_PROPS, TUPLE_B_OPEN_PROPS, [
    ...RESULT,
    Intersect<TUPLE_A_VALUES_HEAD, TUPLE_B_VALUES_HEAD>
]> : never : never : IntersectTupleValues<TUPLE_A_VALUES_TAIL, TUPLE_B_VALUES, TUPLE_A_IS_OPEN, TUPLE_B_IS_OPEN, TUPLE_A_OPEN_PROPS, TUPLE_B_OPEN_PROPS, [
    ...RESULT,
    TUPLE_B_IS_OPEN extends true ? Intersect<TUPLE_A_VALUES_HEAD, TUPLE_B_OPEN_PROPS> : Never
]> : never : never : TUPLE_B_VALUES extends [
    infer TUPLE_B_VALUES_HEAD,
    ...infer TUPLE_B_VALUES_TAIL
] ? TUPLE_B_VALUES_HEAD extends Type ? TUPLE_B_VALUES_TAIL extends Type[] ? IntersectTupleValues<TUPLE_A_VALUES, TUPLE_B_VALUES_TAIL, TUPLE_A_IS_OPEN, TUPLE_B_IS_OPEN, TUPLE_A_OPEN_PROPS, TUPLE_B_OPEN_PROPS, [
    ...RESULT,
    TUPLE_A_IS_OPEN extends true ? Intersect<TUPLE_B_VALUES_HEAD, TUPLE_A_OPEN_PROPS> : Never
]> : never : never : RESULT;

declare type MergeArrayValuesToSerializable<VALUES extends Type, META_ARRAY extends ArrayType, SERIALIZABLE_META_TYPE extends SerializableType> = $MergeArrayValuesToSerializable<VALUES, META_ARRAY, SERIALIZABLE_META_TYPE>;
declare type $MergeArrayValuesToSerializable<VALUES, META_ARRAY extends ArrayType, SERIALIZABLE_META_TYPE extends SerializableType> = _$Array<VALUES, IntersectIsSerialized<META_ARRAY, SERIALIZABLE_META_TYPE>, IntersectDeserialized<META_ARRAY, SERIALIZABLE_META_TYPE>>;
declare type IntersectArray<META_ARRAY extends ArrayType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_TYPE : META_TYPE extends AnyType ? MergeArrayValuesToSerializable<ArrayValues<META_ARRAY>, META_ARRAY, META_TYPE> : META_TYPE extends ConstType ? IntersectConstToArray<META_TYPE, META_ARRAY> : META_TYPE extends EnumType ? IntersectEnumToArray<META_TYPE, META_ARRAY> : META_TYPE extends PrimitiveType ? Never : META_TYPE extends ArrayType ? IntersectArrays<META_ARRAY, META_TYPE> : META_TYPE extends TupleType ? IntersectTupleToArray<META_TYPE, META_ARRAY> : META_TYPE extends ObjectType ? Never : META_TYPE extends UnionType ? DistributeIntersection<META_TYPE, META_ARRAY> : Never : Never;
declare type IntersectArrays<META_ARRAY_A extends ArrayType, META_ARRAY_B extends ArrayType> = $MergeArrayValuesToSerializable<Intersect<ArrayValues<META_ARRAY_A>, ArrayValues<META_ARRAY_B>>, META_ARRAY_A, META_ARRAY_B>;

declare type MergeObjectPropsToSerializable<VALUES extends Record<string, Type>, REQUIRED_KEYS extends string, OPEN_PROPS extends Type, META_OBJECT extends ObjectType, SERIALIZABLE_META_TYPE extends SerializableType> = $MergeObjectPropsToSerializable<VALUES, REQUIRED_KEYS, OPEN_PROPS, META_OBJECT, SERIALIZABLE_META_TYPE>;
declare type $MergeObjectPropsToSerializable<VALUES, REQUIRED_KEYS, OPEN_PROPS, META_OBJECT extends ObjectType, SERIALIZABLE_META_TYPE extends SerializableType> = _$Object<VALUES, REQUIRED_KEYS, OPEN_PROPS, IntersectIsSerialized<META_OBJECT, SERIALIZABLE_META_TYPE>, IntersectDeserialized<META_OBJECT, SERIALIZABLE_META_TYPE>>;
declare type IntersectObject<META_OBJECT extends ObjectType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_TYPE : META_TYPE extends AnyType ? MergeObjectPropsToSerializable<ObjectValues<META_OBJECT>, ObjectRequiredKeys<META_OBJECT>, ObjectOpenProps<META_OBJECT>, META_OBJECT, META_TYPE> : META_TYPE extends ConstType ? IntersectConstToObject<META_TYPE, META_OBJECT> : META_TYPE extends EnumType ? IntersectEnumToObject<META_TYPE, META_OBJECT> : META_TYPE extends PrimitiveType ? Never : META_TYPE extends ArrayType ? Never : META_TYPE extends TupleType ? Never : META_TYPE extends ObjectType ? IntersectObjects<META_OBJECT, META_TYPE> : META_TYPE extends UnionType ? DistributeIntersection<META_TYPE, META_OBJECT> : Never : Never;
declare type IntersectObjects<META_OBJECT_A extends ObjectType, META_OBJECT_B extends ObjectType, INTERSECTED_VALUES extends Record<string, unknown> = IntersectObjectsValues<META_OBJECT_A, META_OBJECT_B>, INTERSECTED_OPEN_PROPS = Intersect<ObjectOpenProps<META_OBJECT_A>, ObjectOpenProps<META_OBJECT_B>>> = $MergeObjectPropsToSerializable<{
    [KEY in keyof INTERSECTED_VALUES]: INTERSECTED_VALUES[KEY];
}, ObjectRequiredKeys<META_OBJECT_A> | ObjectRequiredKeys<META_OBJECT_B>, INTERSECTED_OPEN_PROPS, META_OBJECT_A, META_OBJECT_B>;
declare type IntersectObjectsValues<META_OBJECT_A extends ObjectType, META_OBJECT_B extends ObjectType> = {
    [KEY in Extract<keyof ObjectValues<META_OBJECT_A> | keyof ObjectValues<META_OBJECT_B>, string>]: $Intersect<ObjectValue<META_OBJECT_A, KEY>, ObjectValue<META_OBJECT_B, KEY>>;
};

declare type MergePrimitiveToSerializable<META_PRIMITIVE extends PrimitiveType, SERIALIZABLE_META_TYPE extends SerializableType> = Primitive<PrimitiveValue<META_PRIMITIVE>, IntersectIsSerialized<META_PRIMITIVE, SERIALIZABLE_META_TYPE>, IntersectDeserialized<META_PRIMITIVE, SERIALIZABLE_META_TYPE>>;
declare type IntersectPrimitive<META_PRIMITIVE extends PrimitiveType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_TYPE : META_TYPE extends AnyType ? MergePrimitiveToSerializable<META_PRIMITIVE, META_TYPE> : META_TYPE extends ConstType ? IntersectConstToPrimitive<META_TYPE, META_PRIMITIVE> : META_TYPE extends EnumType ? IntersectEnumToPrimitive<META_TYPE, META_PRIMITIVE> : META_TYPE extends PrimitiveType ? If$1<And<DoesExtend$1<PrimitiveValue<META_PRIMITIVE>, PrimitiveValue<META_TYPE>>, DoesExtend$1<PrimitiveValue<META_TYPE>, PrimitiveValue<META_PRIMITIVE>>>, MergePrimitiveToSerializable<META_PRIMITIVE, META_TYPE>, Never> : META_TYPE extends ArrayType ? Never : META_TYPE extends TupleType ? Never : META_TYPE extends ObjectType ? Never : META_TYPE extends UnionType ? DistributeIntersection<META_TYPE, META_PRIMITIVE> : Never : Never;

declare type IntersectAny<META_ANY extends AnyType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_TYPE : META_TYPE extends AnyType ? Any<IntersectIsSerialized<META_ANY, META_TYPE>, IntersectDeserialized<META_ANY, META_TYPE>> : META_TYPE extends ConstType ? MergeConstToSerializable<META_TYPE, META_ANY> : META_TYPE extends EnumType ? MergeEnumValuesToSerializable<EnumValues<META_TYPE>, META_TYPE, META_ANY> : META_TYPE extends PrimitiveType ? MergePrimitiveToSerializable<META_TYPE, META_ANY> : META_TYPE extends ArrayType ? MergeArrayValuesToSerializable<ArrayValues<META_TYPE>, META_TYPE, META_ANY> : META_TYPE extends TupleType ? MergeTuplePropsToSerializable<TupleValues<META_TYPE>, TupleOpenProps<META_TYPE>, META_TYPE, META_ANY> : META_TYPE extends ObjectType ? MergeObjectPropsToSerializable<ObjectValues<META_TYPE>, ObjectRequiredKeys<META_TYPE>, ObjectOpenProps<META_TYPE>, META_TYPE, META_ANY> : META_TYPE extends UnionType ? DistributeIntersection<META_TYPE, META_ANY> : Never : Never;

declare type Intersect<META_TYPE_A extends Type, META_TYPE_B extends Type> = $Intersect<META_TYPE_A, META_TYPE_B>;
declare type $Intersect<META_TYPE_A, META_TYPE_B> = META_TYPE_A extends NeverType ? META_TYPE_A : META_TYPE_A extends AnyType ? IntersectAny<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends ConstType ? IntersectConst<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends EnumType ? IntersectEnum<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends PrimitiveType ? IntersectPrimitive<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends ArrayType ? IntersectArray<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends TupleType ? IntersectTuple<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends ObjectType ? IntersectObject<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends UnionType ? IntersectUnion<META_TYPE_A, META_TYPE_B> : Never;

declare type DistributeUnion<META_UNION extends UnionType, META_TYPE> = $Union<RecurseOnUnionValues<UnionValues<META_UNION>, META_TYPE>>;
declare type RecurseOnUnionValues<META_UNION_VALUES extends Type, META_TYPE> = META_UNION_VALUES extends infer META_UNION_VALUE ? _$Exclude<META_UNION_VALUE, META_TYPE> : never;
declare type ExcludeUnion<META_TYPE, META_UNION extends UnionType> = If$1<IsNever$1<UnionValues<META_UNION>>, META_TYPE, ExcludeUnionValue<META_TYPE, UnionLast$1<UnionValues<META_UNION>>, META_UNION>>;
declare type ExcludeUnionValue<META_TYPE, META_UNION_VALUE, META_UNION extends UnionType> = $Intersect<_$Exclude<META_TYPE, META_UNION_VALUE>, _$Exclude<META_TYPE, $Union<Exclude<UnionValues<META_UNION>, META_UNION_VALUE>>>>;

declare type ExcludeFromAny<META_ANY extends AnyType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_ANY : META_TYPE extends AnyType ? Never : META_TYPE extends ConstType ? META_ANY : META_TYPE extends EnumType ? META_ANY : META_TYPE extends PrimitiveType ? META_ANY : META_TYPE extends ArrayType ? META_ANY : META_TYPE extends TupleType ? META_ANY : META_TYPE extends ObjectType ? META_ANY : META_TYPE extends UnionType ? ExcludeUnion<META_ANY, META_TYPE> : Never : Never;

declare type ExcludeFromArray<META_ARRAY extends ArrayType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_ARRAY : META_TYPE extends AnyType ? Never : META_TYPE extends ConstType ? META_ARRAY : META_TYPE extends EnumType ? META_ARRAY : META_TYPE extends PrimitiveType ? META_ARRAY : META_TYPE extends ArrayType ? ExcludeArrays<META_ARRAY, META_TYPE> : META_TYPE extends TupleType ? And<DoesExtend$1<TupleValues<META_TYPE>, []>, IsTupleOpen<META_TYPE>> extends true ? ExcludeArrays<META_ARRAY, _Array<TupleOpenProps<META_TYPE>>> : META_ARRAY : META_TYPE extends ObjectType ? META_ARRAY : META_TYPE extends UnionType ? ExcludeUnion<META_ARRAY, META_TYPE> : Never : Never;
declare type ExcludeArrays<META_ARRAY_A extends ArrayType, META_ARRAY_B extends ArrayType> = _Exclude<ArrayValues<META_ARRAY_A>, ArrayValues<META_ARRAY_B>> extends NeverType ? NeverType : META_ARRAY_A;

declare type ExcludeFromConst<META_CONST extends ConstType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_CONST : META_TYPE extends AnyType ? Never : META_TYPE extends ConstType ? CheckNotExtendsResolved<META_CONST, META_TYPE> : META_TYPE extends EnumType ? CheckNotExtendsResolved<META_CONST, META_TYPE> : META_TYPE extends PrimitiveType ? CheckNotExtendsResolved<META_CONST, META_TYPE> : META_TYPE extends ArrayType ? CheckNotExtendsResolved<META_CONST, META_TYPE> : META_TYPE extends TupleType ? CheckNotExtendsResolved<META_CONST, META_TYPE> : META_TYPE extends ObjectType ? ExcludeObject<META_CONST, META_TYPE> : META_TYPE extends UnionType ? ExcludeUnion<META_CONST, META_TYPE> : Never : Never;
declare type CheckNotExtendsResolved<META_CONST extends ConstType, META_TYPE extends Type> = ConstValue<META_CONST> extends Resolve<META_TYPE, {
    deserialize: false;
}> ? Never : META_CONST;
declare type ExcludeObject<META_CONST extends ConstType, META_OBJECT extends ObjectType> = If$1<IsObject<ConstValue<META_CONST>>, ObjectRequiredKeys<META_OBJECT> extends keyof ConstValue<META_CONST> ? ExcludeObjectFromConst<META_CONST, META_OBJECT> : META_CONST, META_CONST>;
declare type ExcludeObjectFromConst<META_CONST extends ConstType, META_OBJECT extends ObjectType, EXCLUDED_CONST_VALUES = ExcludeConstValues<ConstValue<META_CONST>, META_OBJECT>> = If$1<IsNever$1<RepresentableKeys$1<EXCLUDED_CONST_VALUES>>, Never, META_CONST>;
declare type RepresentableKeys$1<VALUES> = {
    [KEY in keyof VALUES]: VALUES[KEY] extends Never ? never : KEY;
}[keyof VALUES];
declare type ExcludeConstValues<VALUE, META_OBJECT extends ObjectType> = {
    [KEY in keyof VALUE]: KEY extends keyof ObjectValues<META_OBJECT> ? _Exclude<Const<VALUE[KEY]>, ObjectValues<META_OBJECT>[KEY]> : IsObjectOpen<META_OBJECT> extends true ? _Exclude<Const<VALUE[KEY]>, ObjectOpenProps<META_OBJECT>> : Const<VALUE[KEY]>;
};

declare type ExcludeFromEnum<META_ENUM extends EnumType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_ENUM : META_TYPE extends AnyType ? Never : META_TYPE extends ConstType ? FilterExcluded<META_ENUM, META_TYPE> : META_TYPE extends EnumType ? FilterExcluded<META_ENUM, META_TYPE> : META_TYPE extends PrimitiveType ? FilterExcluded<META_ENUM, META_TYPE> : META_TYPE extends ArrayType ? FilterExcluded<META_ENUM, META_TYPE> : META_TYPE extends TupleType ? FilterExcluded<META_ENUM, META_TYPE> : META_TYPE extends ObjectType ? FilterExcluded<META_ENUM, META_TYPE> : META_TYPE extends UnionType ? ExcludeUnion<META_ENUM, META_TYPE> : Never : Never;
declare type FilterExcluded<META_ENUM extends EnumType, META_TYPE extends Type> = Enum<RecurseOnEnumValues<EnumValues<META_ENUM>, META_TYPE>>;
declare type RecurseOnEnumValues<ENUM_VALUES, META_TYPE extends Type> = ENUM_VALUES extends infer ENUM_VALUE ? _Exclude<Const<ENUM_VALUE>, META_TYPE> extends NeverType ? never : ENUM_VALUE : never;
declare type ExcludeEnum<META_TYPE extends Type, ENUM_TYPE extends EnumType, ENUM_VALUES = EnumValues<ENUM_TYPE>> = ExcludeEnumValue<META_TYPE, UnionLast<ENUM_VALUES>, ENUM_VALUES>;
declare type ExcludeEnumValue<META_TYPE extends Type, LAST_ENUM_VALUE, ENUM_VALUES> = $Intersect<_Exclude<META_TYPE, Const<LAST_ENUM_VALUE>>, _Exclude<META_TYPE, Enum<Exclude<ENUM_VALUES, LAST_ENUM_VALUE>>>>;

declare type CrossValue<VALUE_A extends Type, IS_OPEN_A extends boolean, IS_REQUIRED_A extends boolean, VALUE_B extends Type, IS_OPEN_B extends boolean, IS_REQUIRED_B extends boolean> = {
    sourceValue: VALUE_A;
    isPossibleInSource: IS_OPEN_A;
    isRequiredInSource: IS_REQUIRED_A;
    isPossibleInExcluded: IS_OPEN_B;
    isRequiredInExcluded: IS_REQUIRED_B;
    exclusionResult: _$Exclude<VALUE_A, VALUE_B>;
};
declare type CrossValueType = {
    sourceValue: Type;
    isPossibleInSource: boolean;
    isRequiredInSource: boolean;
    isPossibleInExcluded: boolean;
    isRequiredInExcluded: boolean;
    exclusionResult: any;
};
declare type SourceValue<CROSSED_VALUE extends CrossValueType> = CROSSED_VALUE["sourceValue"];
declare type IsPossibleInSource<CROSSED_VALUE extends CrossValueType> = CROSSED_VALUE["isPossibleInSource"];
declare type IsRequiredInSource<CROSSED_VALUE extends CrossValueType> = CROSSED_VALUE["isRequiredInSource"];
declare type IsPossibleInExcluded<CROSSED_VALUE extends CrossValueType> = CROSSED_VALUE["isPossibleInExcluded"];
declare type IsRequiredInExcluded<CROSSED_VALUE extends CrossValueType> = CROSSED_VALUE["isRequiredInExcluded"];
declare type ExclusionResult<CROSSED_VALUE extends CrossValueType> = CROSSED_VALUE["exclusionResult"];
declare type IsOutsideOfSourceScope<CROSSED_VALUE extends CrossValueType> = And<IsRequiredInExcluded<CROSSED_VALUE>, Not<IsPossibleInSource<CROSSED_VALUE>>>;
declare type IsOutsideOfExcludedScope<CROSSED_VALUE extends CrossValueType> = And<IsRequiredInSource<CROSSED_VALUE>, Not<IsPossibleInExcluded<CROSSED_VALUE>>>;
declare type Propagate<CROSSED_VALUE extends CrossValueType> = ExclusionResult<CROSSED_VALUE> extends NeverType ? SourceValue<CROSSED_VALUE> : ExclusionResult<CROSSED_VALUE>;
declare type IsOmittable<CROSSED_VALUE extends CrossValueType> = And<Not<IsRequiredInSource<CROSSED_VALUE>>, IsRequiredInExcluded<CROSSED_VALUE>>;

declare type ExcludeFromObject<META_OBJECT extends ObjectType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_OBJECT : META_TYPE extends AnyType ? Never : META_TYPE extends ConstType ? ExcludeConstFromObject<META_OBJECT, META_TYPE> : META_TYPE extends EnumType ? ExcludeEnum<META_OBJECT, META_TYPE> : META_TYPE extends PrimitiveType ? META_OBJECT : META_TYPE extends ArrayType ? META_OBJECT : META_TYPE extends TupleType ? META_OBJECT : META_TYPE extends ObjectType ? ExcludeObjects<META_OBJECT, META_TYPE> : META_TYPE extends UnionType ? ExcludeUnion<META_OBJECT, META_TYPE> : Never : Never;
declare type ExcludeObjects<META_OBJECT_A extends ObjectType, META_OBJECT_B extends ObjectType, CROSSED_VALUES extends Record<string, CrossValueType> = ExcludeObjectValues<META_OBJECT_A, META_OBJECT_B>, REPRESENTABLE_KEYS extends string = RepresentableKeys<CROSSED_VALUES>, OPEN_PROPS_EXCLUSION = _Exclude<ObjectOpenProps<META_OBJECT_A>, ObjectOpenProps<META_OBJECT_B>>> = DoesObjectSizesMatch<META_OBJECT_A, META_OBJECT_B, CROSSED_VALUES> extends true ? {
    moreThanTwo: META_OBJECT_A;
    onlyOne: PropagateExclusion$1<META_OBJECT_A, CROSSED_VALUES>;
    none: OmitOmittableKeys<META_OBJECT_A, CROSSED_VALUES>;
}[And<IsObjectOpen<META_OBJECT_A>, Not<DoesExtend$1<OPEN_PROPS_EXCLUSION, NeverType>>> extends true ? "moreThanTwo" : GetUnionLength<REPRESENTABLE_KEYS>] : META_OBJECT_A;
declare type ExcludeObjectValues<META_OBJECT_A extends ObjectType, META_OBJECT_B extends ObjectType> = {
    [KEY in Extract<keyof ObjectValues<META_OBJECT_A> | keyof ObjectValues<META_OBJECT_B> | ObjectRequiredKeys<META_OBJECT_A> | ObjectRequiredKeys<META_OBJECT_B>, string>]: CrossValue<ObjectValue<META_OBJECT_A, KEY>, IsPossibleIn<META_OBJECT_A, KEY>, IsRequiredIn<META_OBJECT_A, KEY>, ObjectValue<META_OBJECT_B, KEY>, IsPossibleIn<META_OBJECT_B, KEY>, IsRequiredIn<META_OBJECT_B, KEY>>;
};
declare type GetUnionLength<UNION> = If$1<IsNever$1<UNION>, "none", If$1<IsNever$1<UnionPop<UNION>>, "onlyOne", "moreThanTwo">>;
declare type IsPossibleIn<META_OBJECT extends ObjectType, KEY extends string> = Or<DoesExtend$1<KEY, keyof ObjectValues<META_OBJECT>>, IsObjectOpen<META_OBJECT>>;
declare type IsRequiredIn<META_OBJECT extends ObjectType, KEY extends string> = DoesExtend$1<KEY, ObjectRequiredKeys<META_OBJECT>>;
declare type DoesObjectSizesMatch<META_OBJECT_A extends ObjectType, META_OBJECT_B extends ObjectType, CROSSED_VALUES extends Record<string, CrossValueType>> = If$1<And<IsObjectOpen<META_OBJECT_A>, Not<IsObjectOpen<META_OBJECT_B>>>, false, And<IsExcludedSmallEnough$1<CROSSED_VALUES>, IsExcludedBigEnough$1<CROSSED_VALUES>>>;
declare type IsExcludedSmallEnough$1<CROSSED_VALUES extends Record<string, CrossValueType>> = Not<DoesExtend$1<true, {
    [KEY in keyof CROSSED_VALUES]: IsOutsideOfSourceScope<CROSSED_VALUES[KEY]>;
}[keyof CROSSED_VALUES]>>;
declare type IsExcludedBigEnough$1<CROSSED_VALUES extends Record<string, CrossValueType>> = Not<DoesExtend$1<true, {
    [KEY in keyof CROSSED_VALUES]: IsOutsideOfExcludedScope<CROSSED_VALUES[KEY]>;
}[keyof CROSSED_VALUES]>>;
declare type RepresentableKeys<CROSSED_VALUES extends Record<string, CrossValueType>> = {
    [KEY in Extract<keyof CROSSED_VALUES, string>]: ExclusionResult<CROSSED_VALUES[KEY]> extends NeverType ? never : KEY;
}[Extract<keyof CROSSED_VALUES, string>];
declare type PropagateExclusion$1<META_OBJECT extends ObjectType, CROSSED_VALUES extends Record<string, CrossValueType>> = _Object<{
    [KEY in keyof CROSSED_VALUES]: Propagate<CROSSED_VALUES[KEY]>;
}, ObjectRequiredKeys<META_OBJECT>, ObjectOpenProps<META_OBJECT>, IsSerialized<META_OBJECT>, Deserialized<META_OBJECT>>;
declare type OmitOmittableKeys<META_OBJECT extends ObjectType, CROSSED_VALUES extends Record<string, CrossValueType>, OMITTABLE_KEYS extends string = OmittableKeys<CROSSED_VALUES>> = {
    moreThanTwo: META_OBJECT;
    onlyOne: _Object<{
        [KEY in keyof CROSSED_VALUES]: KEY extends OMITTABLE_KEYS ? Never : SourceValue<CROSSED_VALUES[KEY]>;
    }, ObjectRequiredKeys<META_OBJECT>, ObjectOpenProps<META_OBJECT>, IsSerialized<META_OBJECT>, Deserialized<META_OBJECT>>;
    none: Never;
}[GetUnionLength<OMITTABLE_KEYS>];
declare type OmittableKeys<CROSSED_VALUES extends Record<string, CrossValueType>> = {
    [KEY in Extract<keyof CROSSED_VALUES, string>]: IsOmittable<CROSSED_VALUES[KEY]> extends true ? KEY : never;
}[Extract<keyof CROSSED_VALUES, string>];
declare type ExcludeConstFromObject<META_OBJECT extends ObjectType, META_CONST extends ConstType, CONST_VALUE = ConstValue<META_CONST>> = If$1<IsObject<CONST_VALUE>, _$Exclude<META_OBJECT, _Object<{
    [KEY in Extract<keyof CONST_VALUE, string>]: Const<CONST_VALUE[KEY]>;
}, Extract<keyof CONST_VALUE, string>, Never, IsSerialized<META_CONST>, Deserialized<META_CONST>>>, META_OBJECT>;

declare type ExcludeFromPrimitive<META_PRIMITIVE extends PrimitiveType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_PRIMITIVE : META_TYPE extends AnyType ? Never : META_TYPE extends ConstType ? META_PRIMITIVE : META_TYPE extends EnumType ? META_PRIMITIVE : META_TYPE extends PrimitiveType ? PrimitiveValue<META_PRIMITIVE> extends PrimitiveValue<META_TYPE> ? Never : META_PRIMITIVE : META_TYPE extends ArrayType ? META_PRIMITIVE : META_TYPE extends TupleType ? META_PRIMITIVE : META_TYPE extends ObjectType ? META_PRIMITIVE : META_TYPE extends UnionType ? ExcludeUnion<META_PRIMITIVE, META_TYPE> : Never : Never;

declare type ExcludeFromTuple<META_TUPLE extends TupleType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_TUPLE : META_TYPE extends AnyType ? Never : META_TYPE extends ConstType ? ExcludeConst<META_TUPLE, META_TYPE> : META_TYPE extends EnumType ? ExcludeEnum<META_TUPLE, META_TYPE> : META_TYPE extends PrimitiveType ? META_TUPLE : META_TYPE extends ArrayType ? ExcludeArray<META_TUPLE, META_TYPE> : META_TYPE extends TupleType ? ExcludeTuples<META_TUPLE, META_TYPE> : META_TYPE extends ObjectType ? META_TUPLE : META_TYPE extends UnionType ? ExcludeUnion<META_TUPLE, META_TYPE> : Never : Never;
declare type ExcludeArray<META_TUPLE extends TupleType, META_ARRAY extends ArrayType> = ExcludeTuples<META_TUPLE, Tuple<[
], ArrayValues<META_ARRAY>, IsSerialized<META_ARRAY>, Deserialized<META_ARRAY>>>;
declare type ExcludeTuples<META_TUPLE_A extends TupleType, META_TUPLE_B extends TupleType, CROSSED_VALUES extends CrossValueType[] = CrossTupleValues<TupleValues<META_TUPLE_A>, TupleValues<META_TUPLE_B>, IsTupleOpen<META_TUPLE_A>, IsTupleOpen<META_TUPLE_B>, TupleOpenProps<META_TUPLE_A>, TupleOpenProps<META_TUPLE_B>>, REPRESENTABLE_CROSSED_VALUES extends CrossValueType[] = RepresentableCrossedValues<CROSSED_VALUES>, EXCLUDED_OPEN_PROPS = _Exclude<TupleOpenProps<META_TUPLE_A>, TupleOpenProps<META_TUPLE_B>>, IS_OPEN_PROPS_EXCLUSION_REPRESENTABLE = Not<DoesExtend$1<EXCLUDED_OPEN_PROPS, NeverType>>> = If$1<DoesTupleSizesMatch<META_TUPLE_A, META_TUPLE_B, CROSSED_VALUES>, {
    moreThanTwo: META_TUPLE_A;
    onlyOne: $Tuple<PropagateExclusion<CROSSED_VALUES>, TupleOpenProps<META_TUPLE_A>, IsSerialized<META_TUPLE_A>, Deserialized<META_TUPLE_A>>;
    none: OmitOmittableCrossedValues<META_TUPLE_A, CROSSED_VALUES>;
}[And<IsTupleOpen<META_TUPLE_A>, IS_OPEN_PROPS_EXCLUSION_REPRESENTABLE> extends true ? "moreThanTwo" : GetTupleLength<REPRESENTABLE_CROSSED_VALUES>], META_TUPLE_A>;
declare type CrossTupleValues<META_TUPLE_A_VALUES extends Type[], META_TUPLE_B_VALUES extends Type[], IS_META_TUPLE_A_OPEN extends boolean, IS_META_TUPLE_B_OPEN extends boolean, META_TUPLE_A_OPEN_PROPS extends Type, META_TUPLE_B_OPEN_PROPS extends Type, CROSSED_VALUES extends CrossValueType[] = []> = META_TUPLE_A_VALUES extends [
    infer META_TUPLE_A_VALUES_HEAD,
    ...infer META_TUPLE_A_VALUES_TAIL
] ? META_TUPLE_A_VALUES_HEAD extends Type ? META_TUPLE_A_VALUES_TAIL extends Type[] ? META_TUPLE_B_VALUES extends [
    infer META_TUPLE_B_VALUES_HEAD,
    ...infer META_TUPLE_B_VALUES_TAIL
] ? META_TUPLE_B_VALUES_HEAD extends Type ? META_TUPLE_B_VALUES_TAIL extends Type[] ? CrossTupleValues<META_TUPLE_A_VALUES_TAIL, META_TUPLE_B_VALUES_TAIL, IS_META_TUPLE_A_OPEN, IS_META_TUPLE_B_OPEN, META_TUPLE_A_OPEN_PROPS, META_TUPLE_B_OPEN_PROPS, [
    ...CROSSED_VALUES,
    CrossValue<META_TUPLE_A_VALUES_HEAD, true, true, META_TUPLE_B_VALUES_HEAD, true, true>
]> : never : never : CrossTupleValues<META_TUPLE_A_VALUES_TAIL, [
], IS_META_TUPLE_A_OPEN, IS_META_TUPLE_B_OPEN, META_TUPLE_A_OPEN_PROPS, META_TUPLE_B_OPEN_PROPS, [
    ...CROSSED_VALUES,
    CrossValue<META_TUPLE_A_VALUES_HEAD, true, true, META_TUPLE_B_OPEN_PROPS, IS_META_TUPLE_B_OPEN, false>
]> : never : never : META_TUPLE_B_VALUES extends [
    infer META_TUPLE_B_VALUES_HEAD,
    ...infer META_TUPLE_B_VALUES_TAIL
] ? META_TUPLE_B_VALUES_HEAD extends Type ? META_TUPLE_B_VALUES_TAIL extends Type[] ? CrossTupleValues<[
], META_TUPLE_B_VALUES_TAIL, IS_META_TUPLE_A_OPEN, IS_META_TUPLE_B_OPEN, META_TUPLE_A_OPEN_PROPS, META_TUPLE_B_OPEN_PROPS, [
    ...CROSSED_VALUES,
    CrossValue<META_TUPLE_A_OPEN_PROPS, IS_META_TUPLE_A_OPEN, false, META_TUPLE_B_VALUES_HEAD, true, true>
]> : never : never : CROSSED_VALUES;
declare type GetTupleLength<ANY_TUPLE extends unknown[], TAIL extends unknown[] = Tail<ANY_TUPLE>> = If$1<DoesExtend$1<ANY_TUPLE, []>, "none", If$1<DoesExtend$1<TAIL, []>, "onlyOne", "moreThanTwo">>;
declare type DoesTupleSizesMatch<META_TUPLE_A extends TupleType, META_TUPLE_B extends TupleType, CROSSED_VALUES extends CrossValueType[]> = If$1<And<IsTupleOpen<META_TUPLE_A>, Not<IsTupleOpen<META_TUPLE_B>>>, false, And<IsExcludedSmallEnough<CROSSED_VALUES>, IsExcludedBigEnough<CROSSED_VALUES>>>;
declare type IsExcludedSmallEnough<CROSSED_VALUES extends CrossValueType[]> = CROSSED_VALUES extends [
    infer CROSSED_VALUES_HEAD,
    ...infer CROSSED_VALUES_TAIL
] ? CROSSED_VALUES_HEAD extends CrossValueType ? CROSSED_VALUES_TAIL extends CrossValueType[] ? If$1<IsOutsideOfSourceScope<CROSSED_VALUES_HEAD>, false, IsExcludedSmallEnough<CROSSED_VALUES_TAIL>> : never : never : true;
declare type IsExcludedBigEnough<CROSSED_VALUES extends CrossValueType[]> = CROSSED_VALUES extends [
    infer CROSSED_VALUES_HEAD,
    ...infer CROSSED_VALUES_TAIL
] ? CROSSED_VALUES_HEAD extends CrossValueType ? CROSSED_VALUES_TAIL extends CrossValueType[] ? If$1<IsOutsideOfExcludedScope<CROSSED_VALUES_HEAD>, false, IsExcludedBigEnough<CROSSED_VALUES_TAIL>> : never : never : true;
declare type RepresentableCrossedValues<CROSSED_VALUES extends CrossValueType[], REPRESENTABLE_CROSSED_VALUES extends CrossValueType[] = []> = CROSSED_VALUES extends [
    infer CROSSED_VALUES_HEAD,
    ...infer CROSSED_VALUES_TAIL
] ? CROSSED_VALUES_HEAD extends CrossValueType ? CROSSED_VALUES_TAIL extends CrossValueType[] ? ExclusionResult<CROSSED_VALUES_HEAD> extends NeverType ? RepresentableCrossedValues<CROSSED_VALUES_TAIL, REPRESENTABLE_CROSSED_VALUES> : RepresentableCrossedValues<CROSSED_VALUES_TAIL, [
    ...REPRESENTABLE_CROSSED_VALUES,
    CROSSED_VALUES_HEAD
]> : never : never : REPRESENTABLE_CROSSED_VALUES;
declare type PropagateExclusion<CROSSED_VALUES extends CrossValueType[], RESULT extends unknown[] = []> = CROSSED_VALUES extends [
    infer CROSSED_VALUES_HEAD,
    ...infer CROSSED_VALUES_TAIL
] ? CROSSED_VALUES_HEAD extends CrossValueType ? CROSSED_VALUES_TAIL extends CrossValueType[] ? PropagateExclusion<CROSSED_VALUES_TAIL, [
    ...RESULT,
    Propagate<CROSSED_VALUES_HEAD>
]> : never : never : RESULT;
declare type OmitOmittableCrossedValues<META_TUPLE extends TupleType, CROSSED_VALUES extends CrossValueType[], OMITTABLE_CROSSED_VALUES extends CrossValueType[] = OmittableCrossedValues<CROSSED_VALUES>> = {
    moreThanTwo: META_TUPLE;
    onlyOne: $Tuple<RequiredCrossedValues<CROSSED_VALUES>, Never, IsSerialized<META_TUPLE>, Deserialized<META_TUPLE>>;
    none: Never;
}[GetTupleLength<OMITTABLE_CROSSED_VALUES>];
declare type OmittableCrossedValues<CROSSED_VALUES extends CrossValueType[], RESULT extends CrossValueType[] = []> = CROSSED_VALUES extends [
    infer CROSSED_VALUES_HEAD,
    ...infer CROSSED_VALUES_TAIL
] ? CROSSED_VALUES_HEAD extends CrossValueType ? CROSSED_VALUES_TAIL extends CrossValueType[] ? If$1<IsOmittable<CROSSED_VALUES_HEAD>, OmittableCrossedValues<CROSSED_VALUES_TAIL, [
    ...RESULT,
    CROSSED_VALUES_HEAD
]>, OmittableCrossedValues<CROSSED_VALUES_TAIL, RESULT>> : never : never : RESULT;
declare type RequiredCrossedValues<CROSSED_VALUES extends CrossValueType[], RESULT extends Type[] = []> = CROSSED_VALUES extends [
    infer CROSSED_VALUES_HEAD,
    ...infer CROSSED_VALUES_TAIL
] ? CROSSED_VALUES_HEAD extends CrossValueType ? CROSSED_VALUES_TAIL extends CrossValueType[] ? IsOmittable<CROSSED_VALUES_HEAD> extends true ? RESULT : RequiredCrossedValues<CROSSED_VALUES_TAIL, [
    ...RESULT,
    SourceValue<CROSSED_VALUES_HEAD>
]> : never : never : RESULT;
declare type ExcludeConst<META_TUPLE extends TupleType, META_CONST extends ConstType, META_CONST_VALUE = ConstValue<META_CONST>> = META_CONST_VALUE extends unknown[] ? _Exclude<META_TUPLE, $Tuple<ExtractConstValues<META_CONST_VALUE>, Never, IsSerialized<META_CONST>, Deserialized<META_CONST>>> : META_TUPLE;
declare type ExtractConstValues<CONST_VALUES extends unknown[], RESULT extends unknown[] = []> = CONST_VALUES extends [infer CONST_VALUES_HEAD, ...infer CONST_VALUES_TAIL] ? ExtractConstValues<CONST_VALUES_TAIL, [...RESULT, Const<CONST_VALUES_HEAD>]> : RESULT;

declare type _Exclude<META_TYPE_A extends Type, META_TYPE_B extends Type> = _$Exclude<META_TYPE_A, META_TYPE_B>;
declare type _$Exclude<META_TYPE_A, META_TYPE_B> = META_TYPE_A extends NeverType ? META_TYPE_A : META_TYPE_A extends AnyType ? ExcludeFromAny<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends ConstType ? ExcludeFromConst<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends EnumType ? ExcludeFromEnum<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends PrimitiveType ? ExcludeFromPrimitive<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends ArrayType ? ExcludeFromArray<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends TupleType ? ExcludeFromTuple<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends ObjectType ? ExcludeFromObject<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends UnionType ? DistributeUnion<META_TYPE_A, META_TYPE_B> : Never;

type index_Never = Never;
type index_Any<IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = Any<IS_SERIALIZED, DESERIALIZED>;
type index_Const<VALUE, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = Const<VALUE, IS_SERIALIZED, DESERIALIZED>;
type index_Enum<VALUES, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = Enum<VALUES, IS_SERIALIZED, DESERIALIZED>;
type index_Primitive<VALUE extends null | boolean | number | string, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = Primitive<VALUE, IS_SERIALIZED, DESERIALIZED>;
type index_$Primitive<VALUE, IS_SERIALIZED = false, DESERIALIZED = never> = $Primitive<VALUE, IS_SERIALIZED, DESERIALIZED>;
type index_Tuple<VALUES extends Type[], OPEN_PROPS extends Type = Never, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = Tuple<VALUES, OPEN_PROPS, IS_SERIALIZED, DESERIALIZED>;
type index_$Tuple<VALUES, OPEN_PROPS = Never, IS_SERIALIZED = false, DESERIALIZED = never> = $Tuple<VALUES, OPEN_PROPS, IS_SERIALIZED, DESERIALIZED>;
type index_Union<VALUES extends Type> = Union<VALUES>;
type index_$Union<VALUES> = $Union<VALUES>;
type index_NeverType = NeverType;
type index_AnyType = AnyType;
type index_ConstType = ConstType;
type index_EnumType = EnumType;
type index_PrimitiveType = PrimitiveType;
type index_ArrayType = ArrayType;
type index_TupleType = TupleType;
type index_ObjectType = ObjectType;
type index_UnionType = UnionType;
type index_Type = Type;
type index_$Resolve<META_TYPE, OPTIONS extends ResolveOptions = ResolveDefaultOptions> = $Resolve<META_TYPE, OPTIONS>;
type index_Resolve<META_TYPE extends Type, OPTIONS extends ResolveOptions = ResolveDefaultOptions> = Resolve<META_TYPE, OPTIONS>;
type index_$Intersect<META_TYPE_A, META_TYPE_B> = $Intersect<META_TYPE_A, META_TYPE_B>;
type index_Intersect<META_TYPE_A extends Type, META_TYPE_B extends Type> = Intersect<META_TYPE_A, META_TYPE_B>;
declare namespace index {
  export {
    index_Never as Never,
    index_Any as Any,
    index_Const as Const,
    index_Enum as Enum,
    index_Primitive as Primitive,
    index_$Primitive as $Primitive,
    _Array as Array,
    _$Array as $Array,
    index_Tuple as Tuple,
    index_$Tuple as $Tuple,
    _Object as Object,
    _$Object as $Object,
    index_Union as Union,
    index_$Union as $Union,
    index_NeverType as NeverType,
    index_AnyType as AnyType,
    index_ConstType as ConstType,
    index_EnumType as EnumType,
    index_PrimitiveType as PrimitiveType,
    index_ArrayType as ArrayType,
    index_TupleType as TupleType,
    index_ObjectType as ObjectType,
    index_UnionType as UnionType,
    index_Type as Type,
    index_$Resolve as $Resolve,
    index_Resolve as Resolve,
    index_$Intersect as $Intersect,
    index_Intersect as Intersect,
    _$Exclude as $Exclude,
    _Exclude as Exclude,
  };
}

export { index as M, index as Meta };
