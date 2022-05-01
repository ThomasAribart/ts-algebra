import { L, A, U } from 'https://cdn.skypack.dev/ts-toolbelt@^9.6.0?dts';

declare type And<A, B> = A extends true ? B extends true ? true : false : false;

declare type DoesExtend<A, B> = A extends B ? true : false;
declare type ArrayKeys = keyof [];
declare type IsObject<T> = T extends object ? ArrayKeys extends Extract<keyof T, ArrayKeys> ? false : true : false;
declare type IsArray<T> = T extends object ? ArrayKeys extends Extract<keyof T, ArrayKeys> ? true : false : false;

declare type If<I extends 0 | 1, T, E> = I extends 1 ? T : E;

declare type DeepMergeUnsafe<A, B> = IsObject<A> extends true ? IsObject<B> extends true ? {
    [K in keyof (A & B)]: K extends keyof B ? K extends keyof A ? DeepMergeUnsafe<A[K], B[K]> : B[K] : K extends keyof A ? A[K] : never;
} : B : IsArray<A> extends true ? IsArray<B> extends true ? B extends L.List ? L.Concat<A.Cast<A, L.List>, B> : never : B : B;

declare type Not<A> = A extends false ? true : A extends true ? false : never;

declare type Or<A, B> = A extends true ? true : B extends true ? true : false;

declare type Prettify<T> = IsObject<T> extends true ? {
    [K in keyof T]: K extends keyof T ? T[K] : never;
} : T;

declare type NeverTypeId = "never";
declare type Never = {
    type: NeverTypeId;
};
declare type NeverType = Never;
declare type ResolveNever = never;

declare type EnumTypeId = "enum";
declare type Enum<V, I extends boolean = false, D = never> = If<A.Equals<V, never>, Never, {
    type: EnumTypeId;
    values: V;
    isSerialized: I;
    deserialized: D;
}>;
declare type EnumType = {
    type: EnumTypeId;
    values: any;
    isSerialized: boolean;
    deserialized: unknown;
};
declare type EnumValues<E extends EnumType> = E["values"];
declare type ResolveEnum<T extends EnumType, O extends ResolveOptions> = And<O["deserialize"], IsSerialized<T>> extends true ? Deserialized<T> : EnumValues<T>;

declare type PrimitiveTypeId = "primitive";
declare type Primitive<T extends null | boolean | number | string, I extends boolean = false, D extends unknown = never> = $Primitive<T, I, D>;
declare type $Primitive<T, I = false, D = never> = If<A.Equals<T, never>, Never, {
    type: PrimitiveTypeId;
    value: T;
    isSerialized: I;
    deserialized: D;
}>;
declare type PrimitiveType = {
    type: PrimitiveTypeId;
    value: null | boolean | number | string;
    isSerialized: boolean;
    deserialized: unknown;
};
declare type PrimitiveValue<T extends PrimitiveType> = T["value"];
declare type ResolvePrimitive<T extends PrimitiveType, O extends ResolveOptions> = And<O["deserialize"], IsSerialized<T>> extends true ? Deserialized<T> : PrimitiveValue<T>;

declare type ArrayTypeId = "array";
declare type _Array<V extends Type = Any, I extends boolean = false, D extends unknown = never> = _$Array<V, I, D>;
declare type _$Array<V = Any, I = false, D = never> = {
    type: ArrayTypeId;
    values: V;
    isSerialized: I;
    deserialized: D;
};
declare type ArrayType = {
    type: ArrayTypeId;
    values: Type;
    isSerialized: boolean;
    deserialized: unknown;
};
declare type ArrayValues<A extends ArrayType> = A["values"];
declare type ResolveArray<T extends ArrayType, O extends ResolveOptions> = And<O["deserialize"], IsSerialized<T>> extends true ? Deserialized<T> : ArrayValues<T> extends NeverType ? [] : Prettify<Resolve<ArrayValues<T>, O>[]>;

declare type TupleTypeId = "tuple";
declare type Tuple<V extends Type[], P extends Type = Never, I extends boolean = false, D extends unknown = never> = $Tuple<V, P, I, D>;
declare type $Tuple<V, P = Never, I = false, D = never> = IsAnyValueNever<V> extends true ? Never : {
    type: TupleTypeId;
    values: V;
    isOpen: Not<DoesExtend<P, NeverType>>;
    openProps: P;
    isSerialized: I;
    deserialized: D;
};
declare type IsAnyValueNever<V> = {
    stop: false;
    continue: V extends any[] ? L.Head<V> extends NeverType ? true : IsAnyValueNever<L.Tail<V>> : true;
}[V extends [any, ...any[]] ? "continue" : "stop"];
declare type TupleType = {
    type: TupleTypeId;
    values: Type[];
    isOpen: boolean;
    openProps: Type;
    isSerialized: boolean;
    deserialized: unknown;
};
declare type TupleValues<T extends TupleType> = T["values"];
declare type IsTupleOpen<T extends TupleType> = T["isOpen"];
declare type TupleOpenProps<T extends TupleType> = T["openProps"];
declare type ResolveTuple<T extends TupleType, O extends ResolveOptions> = And<O["deserialize"], IsSerialized<T>> extends true ? Deserialized<T> : IsTupleOpen<T> extends true ? L.Concat<RecurseOnTuple<TupleValues<T>, O>, [
    ...Resolve<TupleOpenProps<T>, O>[]
]> : RecurseOnTuple<TupleValues<T>, O>;
declare type RecurseOnTuple<V extends Type[], O extends ResolveOptions, R extends any[] = []> = {
    stop: L.Reverse<R>;
    continue: RecurseOnTuple<L.Tail<V>, O, L.Prepend<R, Resolve<L.Head<V>, O>>>;
}[V extends [any, ...any[]] ? "continue" : "stop"];

declare type ObjectTypeId = "object";
declare type _Object<V extends Record<string, Type> = {}, R extends string = never, P extends Type = Never, I extends boolean = false, D extends unknown = never> = _$Object<V, R, P, I, D>;
declare type _$Object<V = {}, R = never, P = Never, I = false, D = never> = DoesExtend<true, {
    [key in Extract<R, string>]: key extends keyof V ? DoesExtend<V[key], NeverType> : DoesExtend<P, NeverType>;
}[Extract<R, string>]> extends true ? Never : {
    type: ObjectTypeId;
    values: V;
    required: R;
    isOpen: Not<DoesExtend<P, NeverType>>;
    openProps: P;
    isSerialized: I;
    deserialized: D;
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
declare type ObjectValues<O extends ObjectType> = O["values"];
declare type ObjectValue<O extends ObjectType, K extends string> = K extends keyof ObjectValues<O> ? ObjectValues<O>[K] : IsObjectOpen<O> extends true ? ObjectOpenProps<O> : Never;
declare type ObjectRequiredKeys<O extends ObjectType> = O["required"];
declare type IsObjectOpen<O extends ObjectType> = O["isOpen"];
declare type ObjectOpenProps<O extends ObjectType> = O["openProps"];
declare type IsObjectEmpty<O extends ObjectType> = DoesExtend<Extract<keyof ObjectValues<O>, keyof ObjectValues<O>>, never>;
declare type ResolveObject<O extends ObjectType, P extends ResolveOptions> = And<P["deserialize"], IsSerialized<O>> extends true ? Deserialized<O> : DeepMergeUnsafe<IsObjectOpen<O> extends true ? IsObjectEmpty<O> extends true ? {
    [key: string]: Resolve<ObjectOpenProps<O>, P>;
} : {
    [key: string]: Resolve<Any, P>;
} : {}, DeepMergeUnsafe<{
    [key in Exclude<keyof ObjectValues<O>, ObjectRequiredKeys<O>>]?: Resolve<ObjectValues<O>[key], P>;
}, {
    [key in ObjectRequiredKeys<O>]: key extends keyof ObjectValues<O> ? Resolve<ObjectValues<O>[key], P> : Resolve<Any, P>;
}>>;

declare type UnionTypeId = "union";
declare type Union<V extends Type> = $Union<V>;
declare type $Union<V> = If<A.Equals<V, never>, Never, DoesExtend<V, NeverType> extends true ? Never : {
    type: UnionTypeId;
    values: V;
}>;
declare type UnionType = {
    type: UnionTypeId;
    values: Type;
};
declare type UnionValues<U extends UnionType> = U["values"];
declare type ResolveUnion<U extends UnionType, O extends ResolveOptions> = RecurseOnUnion<UnionValues<U>, O>;
declare type RecurseOnUnion<V extends Type, O extends ResolveOptions> = V extends infer T ? $Resolve<T, O> : never;

declare type Type = AnyType | NeverType | ConstType | EnumType | PrimitiveType | ArrayType | TupleType | ObjectType | UnionType;
declare type SerializableType = Type extends infer U ? U extends {
    isSerialized: boolean;
    deserialized: unknown;
} ? U : never : never;

declare type IsSerialized<T extends SerializableType> = T["isSerialized"];
declare type Deserialized<T extends SerializableType> = T["deserialized"];

declare type ConstTypeId = "const";
declare type Const<V, I extends boolean = false, D = never> = If<A.Equals<V, never>, Never, {
    type: ConstTypeId;
    value: V;
    isSerialized: I;
    deserialized: D;
}>;
declare type ConstType = {
    type: ConstTypeId;
    value: any;
    isSerialized: boolean;
    deserialized: unknown;
};
declare type ConstValue<C extends ConstType> = C["value"];
declare type ResolveConst<T extends ConstType, O extends ResolveOptions> = And<O["deserialize"], IsSerialized<T>> extends true ? Deserialized<T> : ConstValue<T>;

declare type ResolveOptions = {
    deserialize: boolean;
};
declare type ResolveDefaultOptions = {
    deserialize: true;
};
declare type Resolve<T extends Type, O extends ResolveOptions = ResolveDefaultOptions> = $Resolve<T, O>;
declare type $Resolve<T, O extends ResolveOptions = ResolveDefaultOptions> = T extends AnyType ? ResolveAny<T, O> : T extends NeverType ? ResolveNever : T extends ConstType ? ResolveConst<T, O> : T extends EnumType ? ResolveEnum<T, O> : T extends PrimitiveType ? ResolvePrimitive<T, O> : T extends ArrayType ? ResolveArray<T, O> : T extends TupleType ? ResolveTuple<T, O> : T extends ObjectType ? ResolveObject<T, O> : T extends UnionType ? ResolveUnion<T, O> : never;

declare type AnyTypeId = "any";
declare type Any<I extends boolean = false, D extends unknown = never> = {
    type: AnyTypeId;
    isSerialized: I;
    deserialized: D;
};
declare type AnyType = {
    type: AnyTypeId;
    isSerialized: boolean;
    deserialized: unknown;
};
declare type ResolveAny<A extends AnyType, O extends ResolveOptions> = And<O["deserialize"], IsSerialized<A>> extends true ? Deserialized<A> : unknown;

declare type IntersectUnion<A extends UnionType, B> = B extends Type ? B extends AnyType ? A : B extends NeverType ? Never : B extends ConstType ? DistributeIntersection<A, B> : B extends EnumType ? DistributeIntersection<A, B> : B extends PrimitiveType ? DistributeIntersection<A, B> : B extends ArrayType ? DistributeIntersection<A, B> : B extends TupleType ? DistributeIntersection<A, B> : B extends ObjectType ? DistributeIntersection<A, B> : B extends UnionType ? DistributeIntersection<A, B> : Never : Never;
declare type DistributeIntersection<A extends UnionType, B> = $Union<RecurseOnUnionValues$1<UnionValues<A>, B>>;
declare type RecurseOnUnionValues$1<V extends Type, B> = V extends infer T ? $Intersect<T, B> : never;

declare type IntersectIsSerialized<A extends SerializableType, B extends SerializableType> = Or<IsSerialized<A>, IsSerialized<B>>;
declare type IntersectDeserialized<A extends SerializableType, B extends SerializableType> = IsSerialized<A> extends true ? IsSerialized<B> extends true ? Deserialized<A> & Deserialized<B> : Deserialized<A> : IsSerialized<B> extends true ? Deserialized<B> : never;

declare type MergeConstToSerializable<A extends ConstType, B extends SerializableType> = Const<ConstValue<A>, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;
declare type IntersectConst<A extends ConstType, B> = B extends Type ? B extends AnyType ? MergeConstToSerializable<A, B> : B extends NeverType ? Never : B extends ConstType ? CheckExtendsResolved<A, B> : B extends EnumType ? IntersectConstToEnum<A, B> : B extends PrimitiveType ? IntersectConstToPrimitive<A, B> : B extends ArrayType ? IntersectConstToArray<A, B> : B extends TupleType ? IntersectConstToTuple<A, B> : B extends ObjectType ? IntersectConstToObject<A, B> : B extends UnionType ? DistributeIntersection<B, A> : Never : Never;
declare type CheckExtendsResolved<A extends ConstType, B extends SerializableType> = ConstValue<A> extends Resolve<B, {
    deserialize: false;
}> ? MergeConstToSerializable<A, B> : Never;
declare type IntersectConstToEnum<A extends ConstType, B extends EnumType> = CheckExtendsResolved<A, B>;
declare type IntersectConstToPrimitive<A extends ConstType, B extends PrimitiveType> = CheckExtendsResolved<A, B>;
declare type IntersectConstToArray<A extends ConstType, B extends ArrayType> = CheckExtendsResolved<A, B>;
declare type IntersectConstToTuple<A extends ConstType, B extends TupleType> = CheckExtendsResolved<A, B>;
declare type IntersectConstToObject<A extends ConstType, B extends ObjectType> = IsObject<ConstValue<A>> extends false ? Never : IntersectObjectConstToObject<A, B>;
declare type IntersectObjectConstToObject<A extends ConstType, B extends ObjectType, V = IntersectConstValuesToObjectValues<ConstValue<A>, B>> = NeverKeys<V> extends never ? MergeConstToSerializable<A, B> : Never;
declare type IntersectConstValuesToObjectValues<V, B extends ObjectType> = {
    [key in Extract<keyof V | ObjectRequiredKeys<B>, string>]: key extends keyof V ? Intersect<Const<V[key]>, ObjectValue<B, key>> : Never;
};
declare type NeverKeys<O> = {
    [key in keyof O]: O[key] extends Never ? key : never;
}[keyof O];

declare type MergeEnumValuesToSerializable<V, A extends EnumType, B extends SerializableType> = Enum<V, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;
declare type IntersectEnum<A extends EnumType, B> = B extends Type ? B extends AnyType ? MergeEnumValuesToSerializable<EnumValues<A>, A, B> : B extends NeverType ? Never : B extends ConstType ? IntersectConstToEnum<B, A> : B extends EnumType ? FilterUnintersecting<A, B> : B extends PrimitiveType ? IntersectEnumToPrimitive<A, B> : B extends ArrayType ? FilterUnintersecting<A, B> : B extends TupleType ? FilterUnintersecting<A, B> : B extends ObjectType ? FilterUnintersecting<A, B> : B extends UnionType ? DistributeIntersection<B, A> : Never : Never;
declare type FilterUnintersecting<A extends EnumType, B extends SerializableType> = MergeEnumValuesToSerializable<RecurseOnEnumValues$1<EnumValues<A>, B>, A, B>;
declare type RecurseOnEnumValues$1<V, B> = V extends infer T ? $Intersect<Const<T>, B> extends Never ? never : T : never;
declare type IntersectEnumToPrimitive<A extends EnumType, B extends PrimitiveType> = FilterUnintersecting<A, B>;
declare type IntersectEnumToArray<A extends EnumType, B extends ArrayType> = FilterUnintersecting<A, B>;
declare type IntersectEnumToTuple<A extends EnumType, B extends TupleType> = FilterUnintersecting<A, B>;
declare type IntersectEnumToObject<A extends EnumType, B extends ObjectType> = FilterUnintersecting<A, B>;

declare type MergePrimitiveToSerializable<A extends PrimitiveType, B extends SerializableType> = Primitive<PrimitiveValue<A>, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;
declare type IntersectPrimitive<A extends PrimitiveType, B> = B extends Type ? B extends AnyType ? MergePrimitiveToSerializable<A, B> : B extends NeverType ? Never : B extends ConstType ? IntersectConstToPrimitive<B, A> : B extends EnumType ? IntersectEnumToPrimitive<B, A> : B extends PrimitiveType ? If<A.Equals<PrimitiveValue<A>, PrimitiveValue<B>>, MergePrimitiveToSerializable<A, B>, Never> : B extends ArrayType ? Never : B extends TupleType ? Never : B extends ObjectType ? Never : B extends UnionType ? DistributeIntersection<B, A> : Never : Never;

declare type MergeTuplePropsToSerializable<V extends Type[], P extends Type, A extends TupleType, B extends SerializableType> = $MergeTuplePropsToSerializable<V, P, A, B>;
declare type $MergeTuplePropsToSerializable<V, P, A extends TupleType, B extends SerializableType> = $Tuple<V, P, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;
declare type IntersectTuple<A extends TupleType, B> = B extends AnyType ? MergeTuplePropsToSerializable<TupleValues<A>, TupleOpenProps<A>, A, B> : B extends NeverType ? B : B extends ConstType ? IntersectConstToTuple<B, A> : B extends EnumType ? IntersectEnumToTuple<B, A> : B extends PrimitiveType ? Never : B extends ArrayType ? IntersectTupleToArray<A, B> : B extends TupleType ? IntersectTuples<A, B> : B extends ObjectType ? Never : B extends UnionType ? DistributeIntersection<B, A> : Never;
declare type IntersectTupleToArray<T extends TupleType, A extends ArrayType, V extends any[] = IntersectTupleToArrayValues<TupleValues<T>, ArrayValues<A>>, O = $Intersect<TupleOpenProps<T>, ArrayValues<A>>> = $MergeTuplePropsToSerializable<V, O, T, A>;
declare type IntersectTupleToArrayValues<V extends Type[], T extends Type, R extends any[] = []> = {
    stop: L.Reverse<R>;
    continue: IntersectTupleToArrayValues<L.Tail<V>, T, L.Prepend<R, Intersect<L.Head<V>, T>>>;
}[V extends [any, ...any[]] ? "continue" : "stop"];
declare type IntersectTuples<A extends TupleType, B extends TupleType, V extends any[] = IntersectTupleValues<TupleValues<A>, TupleValues<B>, IsTupleOpen<A>, IsTupleOpen<B>, TupleOpenProps<A>, TupleOpenProps<B>>, O = $Intersect<TupleOpenProps<A>, TupleOpenProps<B>>> = $MergeTuplePropsToSerializable<V, O, A, B>;
declare type IntersectTupleValues<V1 extends Type[], V2 extends Type[], O1 extends boolean, O2 extends boolean, P1 extends Type, P2 extends Type, R extends any[] = []> = {
    stop: L.Reverse<R>;
    continue1: IntersectTupleValues<L.Tail<V1>, V2, O1, O2, P1, P2, L.Prepend<R, O2 extends true ? Intersect<L.Head<V1>, P2> : Never>>;
    continue2: IntersectTupleValues<V1, L.Tail<V2>, O1, O2, P1, P2, L.Prepend<R, O1 extends true ? Intersect<L.Head<V2>, P1> : Never>>;
    continueBoth: IntersectTupleValues<L.Tail<V1>, L.Tail<V2>, O1, O2, P1, P2, L.Prepend<R, Intersect<L.Head<V1>, L.Head<V2>>>>;
}[V1 extends [any, ...any[]] ? V2 extends [any, ...any[]] ? "continueBoth" : "continue1" : V2 extends [any, ...any[]] ? "continue2" : "stop"];

declare type MergeArrayValuesToSerializable<V extends Type, A extends ArrayType, B extends SerializableType> = $MergeArrayValuesToSerializable<V, A, B>;
declare type $MergeArrayValuesToSerializable<V, A extends ArrayType, B extends SerializableType> = _$Array<V, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;
declare type IntersectArray<A extends ArrayType, B> = B extends Type ? B extends AnyType ? MergeArrayValuesToSerializable<ArrayValues<A>, A, B> : B extends NeverType ? Never : B extends ConstType ? IntersectConstToArray<B, A> : B extends EnumType ? IntersectEnumToArray<B, A> : B extends PrimitiveType ? Never : B extends ArrayType ? IntersectArrays<A, B> : B extends TupleType ? IntersectTupleToArray<B, A> : B extends ObjectType ? Never : B extends UnionType ? DistributeIntersection<B, A> : Never : Never;
declare type IntersectArrays<A extends ArrayType, B extends ArrayType> = $MergeArrayValuesToSerializable<Intersect<ArrayValues<A>, ArrayValues<B>>, A, B>;

declare type MergeObjectPropsToSerializable<V extends Record<string, Type>, R extends string, P extends Type, A extends ObjectType, B extends SerializableType> = $MergeObjectPropsToSerializable<V, R, P, A, B>;
declare type $MergeObjectPropsToSerializable<V, R, P, A extends ObjectType, B extends SerializableType> = _$Object<V, R, P, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;
declare type IntersectObject<A extends ObjectType, B> = B extends Type ? B extends AnyType ? MergeObjectPropsToSerializable<ObjectValues<A>, ObjectRequiredKeys<A>, ObjectOpenProps<A>, A, B> : B extends NeverType ? Never : B extends ConstType ? IntersectConstToObject<B, A> : B extends EnumType ? IntersectEnumToObject<B, A> : B extends PrimitiveType ? Never : B extends ArrayType ? Never : B extends TupleType ? Never : B extends ObjectType ? IntersectObjects<A, B> : B extends UnionType ? DistributeIntersection<B, A> : Never : Never;
declare type IntersectObjects<A extends ObjectType, B extends ObjectType, V extends Record<string, any> = IntersectObjectsValues<A, B>, O = Intersect<ObjectOpenProps<A>, ObjectOpenProps<B>>> = $MergeObjectPropsToSerializable<{
    [key in keyof V]: V[key];
}, ObjectRequiredKeys<A> | ObjectRequiredKeys<B>, O, A, B>;
declare type IntersectObjectsValues<A extends ObjectType, B extends ObjectType> = {
    [key in Extract<keyof ObjectValues<A> | keyof ObjectValues<B>, string>]: $Intersect<ObjectValue<A, key>, ObjectValue<B, key>>;
};

declare type IntersectAny<A extends AnyType, B> = B extends Type ? B extends AnyType ? Any<IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>> : B extends NeverType ? Never : B extends ConstType ? MergeConstToSerializable<B, A> : B extends EnumType ? MergeEnumValuesToSerializable<EnumValues<B>, B, A> : B extends PrimitiveType ? MergePrimitiveToSerializable<B, A> : B extends ArrayType ? MergeArrayValuesToSerializable<ArrayValues<B>, B, A> : B extends TupleType ? MergeTuplePropsToSerializable<TupleValues<B>, TupleOpenProps<B>, B, A> : B extends ObjectType ? MergeObjectPropsToSerializable<ObjectValues<B>, ObjectRequiredKeys<B>, ObjectOpenProps<B>, B, A> : B extends UnionType ? DistributeIntersection<B, A> : Never : Never;

declare type Intersect<A extends Type, B extends Type> = $Intersect<A, B>;
declare type $Intersect<A, B> = A extends AnyType ? IntersectAny<A, B> : A extends NeverType ? A : A extends ConstType ? IntersectConst<A, B> : A extends EnumType ? IntersectEnum<A, B> : A extends PrimitiveType ? IntersectPrimitive<A, B> : A extends ArrayType ? IntersectArray<A, B> : A extends TupleType ? IntersectTuple<A, B> : A extends ObjectType ? IntersectObject<A, B> : A extends UnionType ? IntersectUnion<A, B> : Never;

declare type DistributeUnion<A extends UnionType, B> = $Union<RecurseOnUnionValues<UnionValues<A>, B>>;
declare type RecurseOnUnionValues<V extends Type, B> = V extends infer T ? _$Exclude<T, B> : never;
declare type ExcludeUnion<A, B extends UnionType> = If<A.Equals<UnionValues<B>, never>, A, ExcludeUnionValue<A, U.Last<UnionValues<B>>, B>>;
declare type ExcludeUnionValue<A, V, B extends UnionType> = $Intersect<_$Exclude<A, V>, _$Exclude<A, $Union<U.Exclude<UnionValues<B>, V>>>>;

declare type ExcludeFromAny<A extends AnyType, B> = B extends Type ? B extends AnyType ? Never : B extends NeverType ? A : B extends ConstType ? A : B extends EnumType ? A : B extends PrimitiveType ? A : B extends ArrayType ? A : B extends TupleType ? A : B extends ObjectType ? A : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;

declare type ExcludeFromConst<A extends ConstType, B> = B extends Type ? B extends AnyType ? Never : B extends NeverType ? A : B extends ConstType ? CheckNotExtendsResolved<A, B> : B extends EnumType ? CheckNotExtendsResolved<A, B> : B extends PrimitiveType ? CheckNotExtendsResolved<A, B> : B extends ArrayType ? CheckNotExtendsResolved<A, B> : B extends TupleType ? CheckNotExtendsResolved<A, B> : B extends ObjectType ? ExcludeObject<A, B> : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;
declare type CheckNotExtendsResolved<A extends ConstType, B extends Type> = ConstValue<A> extends Resolve<B, {
    deserialize: false;
}> ? Never : A;
declare type ExcludeObject<A extends ConstType, B extends ObjectType> = IsObject<ConstValue<A>> extends true ? ObjectRequiredKeys<B> extends keyof ConstValue<A> ? ExcludeObjectFromConst<A, B> : A : A;
declare type ExcludeObjectFromConst<A extends ConstType, B extends ObjectType, X = ExcludeConstValues<ConstValue<A>, B>> = NonNeverKeys$1<X> extends never ? Never : A;
declare type NonNeverKeys$1<O> = {
    [key in keyof O]: O[key] extends Never ? never : key;
}[keyof O];
declare type ExcludeConstValues<V, B extends ObjectType> = {
    [key in keyof V]: key extends keyof ObjectValues<B> ? _Exclude<Const<V[key]>, ObjectValues<B>[key]> : IsObjectOpen<B> extends true ? _Exclude<Const<V[key]>, ObjectOpenProps<B>> : Const<V[key]>;
};

declare type ExcludeFromEnum<A extends EnumType, B> = B extends Type ? B extends AnyType ? Never : B extends NeverType ? A : B extends ConstType ? FilterExcluded<A, B> : B extends EnumType ? FilterExcluded<A, B> : B extends PrimitiveType ? FilterExcluded<A, B> : B extends ArrayType ? FilterExcluded<A, B> : B extends TupleType ? FilterExcluded<A, B> : B extends ObjectType ? FilterExcluded<A, B> : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;
declare type FilterExcluded<A extends EnumType, B extends Type> = Enum<RecurseOnEnumValues<EnumValues<A>, B>>;
declare type RecurseOnEnumValues<V, B extends Type> = V extends infer EnumValue ? _Exclude<Const<EnumValue>, B> extends NeverType ? never : EnumValue : never;
declare type ExcludeEnum<A extends Type, B extends EnumType, V = EnumValues<B>> = ExcludeEnumValue<A, U.Last<V>, V>;
declare type ExcludeEnumValue<A extends Type, L, V> = $Intersect<_Exclude<A, Const<L>>, _Exclude<A, Enum<U.Exclude<V, L>>>>;

declare type ExcludeFromPrimitive<A extends PrimitiveType, B> = B extends Type ? B extends AnyType ? Never : B extends NeverType ? A : B extends ConstType ? A : B extends EnumType ? A : B extends PrimitiveType ? PrimitiveValue<A> extends PrimitiveValue<B> ? Never : A : B extends ArrayType ? A : B extends TupleType ? A : B extends ObjectType ? A : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;

declare type ExcludeFromArray<A extends ArrayType, B> = B extends Type ? B extends AnyType ? Never : B extends NeverType ? A : B extends ConstType ? A : B extends EnumType ? A : B extends PrimitiveType ? A : B extends ArrayType ? ExcludeArrays<A, B> : B extends TupleType ? And<DoesExtend<A.Equals<TupleValues<B>, []>, 1>, IsTupleOpen<B>> extends true ? ExcludeArrays<A, _Array<TupleOpenProps<B>>> : A : B extends ObjectType ? A : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;
declare type ExcludeArrays<A extends ArrayType, B extends ArrayType> = _Exclude<ArrayValues<A>, ArrayValues<B>> extends NeverType ? NeverType : A;

declare type CrossValue<V1 extends Type, P1 extends boolean, R1 extends boolean, V2 extends Type, P2 extends boolean, R2 extends boolean> = {
    sourceValue: V1;
    isPossibleInSource: P1;
    isRequiredInSource: R1;
    isPossibleInExcluded: P2;
    isRequiredInExcluded: R2;
    exclusionValue: _$Exclude<V1, V2>;
};
declare type CrossValueType = {
    sourceValue: Type;
    isPossibleInSource: boolean;
    isRequiredInSource: boolean;
    isPossibleInExcluded: boolean;
    isRequiredInExcluded: boolean;
    exclusionValue: any;
};
declare type SourceValue<C extends CrossValueType> = C["sourceValue"];
declare type IsPossibleInSource<C extends CrossValueType> = C["isPossibleInSource"];
declare type IsRequiredInSource<C extends CrossValueType> = C["isRequiredInSource"];
declare type IsPossibleInExcluded<C extends CrossValueType> = C["isPossibleInExcluded"];
declare type IsRequiredInExcluded<C extends CrossValueType> = C["isRequiredInExcluded"];
declare type ExclusionValue<C extends CrossValueType> = C["exclusionValue"];
declare type IsOutsideOfSourceScope<C extends CrossValueType> = And<IsRequiredInExcluded<C>, Not<IsPossibleInSource<C>>>;
declare type IsOutsideOfExcludedScope<C extends CrossValueType> = And<IsRequiredInSource<C>, Not<IsPossibleInExcluded<C>>>;
declare type Propagate<C extends CrossValueType> = ExclusionValue<C> extends NeverType ? SourceValue<C> : ExclusionValue<C>;
declare type IsOmittable<C extends CrossValueType> = And<Not<IsRequiredInSource<C>>, IsRequiredInExcluded<C>>;

declare type ExcludeFromTuple<A extends TupleType, B> = B extends Type ? B extends AnyType ? Never : B extends NeverType ? A : B extends ConstType ? ExcludeConst<A, B> : B extends EnumType ? ExcludeEnum<A, B> : B extends PrimitiveType ? A : B extends ArrayType ? ExcludeArray<A, B> : B extends TupleType ? ExcludeTuples<A, B> : B extends ObjectType ? A : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;
declare type ExcludeArray<A extends TupleType, B extends ArrayType> = ExcludeTuples<A, Tuple<[], ArrayValues<B>, IsSerialized<B>, Deserialized<B>>>;
declare type ExcludeTuples<A extends TupleType, B extends TupleType, C extends CrossValueType[] = CrossTupleValues<TupleValues<A>, TupleValues<B>, IsTupleOpen<A>, IsTupleOpen<B>, TupleOpenProps<A>, TupleOpenProps<B>>, N extends CrossValueType[] = NonNeverItems<C>, P = _Exclude<TupleOpenProps<A>, TupleOpenProps<B>>, I = Not<DoesExtend<P, NeverType>>> = DoesTupleSizesMatch<A, B, C> extends true ? {
    moreThanTwo: A;
    onlyOne: $Tuple<PropagateExclusion$1<C>, TupleOpenProps<A>, IsSerialized<A>, Deserialized<A>>;
    none: OmitOmittableItems<A, C>;
}[And<IsTupleOpen<A>, I> extends true ? "moreThanTwo" : GetTupleLength<N>] : A;
declare type CrossTupleValues<V1 extends Type[], V2 extends Type[], O1 extends boolean, O2 extends boolean, P1 extends Type, P2 extends Type, C extends CrossValueType[] = []> = {
    stop: L.Reverse<C>;
    continue1: CrossTupleValues<L.Tail<V1>, [
    ], O1, O2, P1, P2, L.Prepend<C, CrossValue<L.Head<V1>, true, true, P2, O2, false>>>;
    continue2: CrossTupleValues<[
    ], L.Tail<V2>, O1, O2, P1, P2, L.Prepend<C, CrossValue<P1, O1, false, L.Head<V2>, true, true>>>;
    continueBoth: CrossTupleValues<L.Tail<V1>, L.Tail<V2>, O1, O2, P1, P2, L.Prepend<C, CrossValue<L.Head<V1>, true, true, L.Head<V2>, true, true>>>;
}[V1 extends [any, ...any[]] ? V2 extends [any, ...any[]] ? "continueBoth" : "continue1" : V2 extends [any, ...any[]] ? "continue2" : "stop"];
declare type GetTupleLength<T extends any[], R extends any[] = L.Tail<T>> = If<A.Equals<T, []>, "none", If<A.Equals<R, []>, "onlyOne", "moreThanTwo">>;
declare type DoesTupleSizesMatch<S extends TupleType, E extends TupleType, C extends CrossValueType[]> = And<IsTupleOpen<S>, Not<IsTupleOpen<E>>> extends true ? false : And<IsExcludedSmallEnough$1<C>, IsExcludedBigEnough$1<C>>;
declare type IsExcludedSmallEnough$1<C extends CrossValueType[]> = {
    stop: true;
    continue: IsOutsideOfSourceScope<L.Head<C>> extends true ? false : IsExcludedSmallEnough$1<L.Tail<C>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];
declare type IsExcludedBigEnough$1<C extends CrossValueType[]> = {
    stop: true;
    continue: IsOutsideOfExcludedScope<L.Head<C>> extends true ? false : IsExcludedBigEnough$1<L.Tail<C>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];
declare type NonNeverItems<C extends CrossValueType[], R extends CrossValueType[] = []> = {
    stop: R;
    continue: ExclusionValue<L.Head<C>> extends NeverType ? NonNeverItems<L.Tail<C>, R> : NonNeverItems<L.Tail<C>, L.Prepend<R, L.Head<C>>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];
declare type PropagateExclusion$1<C extends CrossValueType[], R extends any[] = []> = {
    stop: L.Reverse<R>;
    continue: PropagateExclusion$1<L.Tail<C>, L.Prepend<R, Propagate<L.Head<C>>>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];
declare type OmitOmittableItems<S extends TupleType, C extends CrossValueType[], I extends CrossValueType[] = OmittableItems<C>> = {
    moreThanTwo: S;
    onlyOne: $Tuple<RequiredTupleValues<C>, Never, IsSerialized<S>, Deserialized<S>>;
    none: Never;
}[GetTupleLength<I>];
declare type OmittableItems<C extends CrossValueType[], R extends CrossValueType[] = []> = {
    stop: R;
    continue: IsOmittable<L.Head<C>> extends true ? OmittableItems<L.Tail<C>, L.Prepend<R, L.Head<C>>> : OmittableItems<L.Tail<C>, R>;
}[C extends [any, ...any[]] ? "continue" : "stop"];
declare type RequiredTupleValues<C extends CrossValueType[], R extends Type[] = []> = {
    stop: L.Reverse<R>;
    continue: IsOmittable<L.Head<C>> extends true ? L.Reverse<R> : RequiredTupleValues<L.Tail<C>, L.Prepend<R, SourceValue<L.Head<C>>>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];
declare type ExcludeConst<A extends TupleType, B extends ConstType, V = ConstValue<B>> = V extends any[] ? _Exclude<A, $Tuple<ExtractConstValues<V>, Never, IsSerialized<B>, Deserialized<B>>> : A;
declare type ExtractConstValues<V extends any[], R extends any[] = []> = {
    stop: L.Reverse<R>;
    continue: ExtractConstValues<L.Tail<V>, L.Prepend<R, Const<L.Head<V>>>>;
}[V extends [any, ...any[]] ? "continue" : "stop"];

declare type ExcludeFromObject<A extends ObjectType, B> = B extends Type ? B extends AnyType ? Never : B extends NeverType ? A : B extends ConstType ? ExcludeConstFromObject<A, B> : B extends EnumType ? ExcludeEnum<A, B> : B extends PrimitiveType ? A : B extends ArrayType ? A : B extends TupleType ? A : B extends ObjectType ? ExcludeObjects<A, B> : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;
declare type ExcludeObjects<A extends ObjectType, B extends ObjectType, C extends Record<string, CrossValueType> = ExcludeObjectValues<A, B>, R extends string = NonNeverKeys<C>, P = _Exclude<ObjectOpenProps<A>, ObjectOpenProps<B>>> = DoesObjectSizesMatch<A, B, C> extends true ? {
    moreThanTwo: A;
    onlyOne: PropagateExclusion<A, C>;
    none: OmitOmittableKeys<A, C>;
}[And<IsObjectOpen<A>, Not<DoesExtend<P, NeverType>>> extends true ? "moreThanTwo" : GetUnionLength<R>] : A;
declare type ExcludeObjectValues<A extends ObjectType, B extends ObjectType> = {
    [key in Extract<keyof ObjectValues<A> | keyof ObjectValues<B> | ObjectRequiredKeys<A> | ObjectRequiredKeys<B>, string>]: CrossValue<ObjectValue<A, key>, IsPossibleIn<A, key>, IsRequiredIn<A, key>, ObjectValue<B, key>, IsPossibleIn<B, key>, IsRequiredIn<B, key>>;
};
declare type GetUnionLength<U> = If<A.Equals<U, never>, "none", If<A.Equals<U.Pop<U>, never>, "onlyOne", "moreThanTwo">>;
declare type IsPossibleIn<O extends ObjectType, K extends string> = Or<DoesExtend<K, keyof ObjectValues<O>>, IsObjectOpen<O>>;
declare type IsRequiredIn<O extends ObjectType, K extends string> = DoesExtend<K, ObjectRequiredKeys<O>>;
declare type DoesObjectSizesMatch<A extends ObjectType, B extends ObjectType, C extends Record<string, CrossValueType>> = And<IsObjectOpen<A>, Not<IsObjectOpen<B>>> extends true ? false : And<IsExcludedSmallEnough<C>, IsExcludedBigEnough<C>>;
declare type IsExcludedSmallEnough<C extends Record<string, CrossValueType>> = Not<DoesExtend<true, {
    [key in keyof C]: IsOutsideOfSourceScope<C[key]>;
}[keyof C]>>;
declare type IsExcludedBigEnough<C extends Record<string, CrossValueType>> = Not<DoesExtend<true, {
    [key in keyof C]: IsOutsideOfExcludedScope<C[key]>;
}[keyof C]>>;
declare type NonNeverKeys<C extends Record<string, CrossValueType>> = {
    [key in Extract<keyof C, string>]: ExclusionValue<C[key]> extends NeverType ? never : key;
}[Extract<keyof C, string>];
declare type PropagateExclusion<A extends ObjectType, C extends Record<string, CrossValueType>> = _Object<{
    [key in keyof C]: Propagate<C[key]>;
}, ObjectRequiredKeys<A>, ObjectOpenProps<A>, IsSerialized<A>, Deserialized<A>>;
declare type OmitOmittableKeys<A extends ObjectType, C extends Record<string, CrossValueType>, K extends string = OmittableKeys<C>> = {
    moreThanTwo: A;
    onlyOne: _Object<{
        [key in keyof C]: key extends K ? Never : SourceValue<C[key]>;
    }, ObjectRequiredKeys<A>, ObjectOpenProps<A>, IsSerialized<A>, Deserialized<A>>;
    none: Never;
}[GetUnionLength<K>];
declare type OmittableKeys<C extends Record<string, CrossValueType>> = {
    [key in Extract<keyof C, string>]: IsOmittable<C[key]> extends true ? key : never;
}[Extract<keyof C, string>];
declare type ExcludeConstFromObject<A extends ObjectType, B extends ConstType, V = ConstValue<B>> = IsObject<V> extends true ? _$Exclude<A, _Object<{
    [key in Extract<keyof V, string>]: Const<V[key]>;
}, Extract<keyof V, string>, Never, IsSerialized<B>, Deserialized<B>>> : A;

declare type _Exclude<A extends Type, B extends Type> = _$Exclude<A, B>;
declare type _$Exclude<A, B> = A extends AnyType ? ExcludeFromAny<A, B> : A extends NeverType ? Never : A extends ConstType ? ExcludeFromConst<A, B> : A extends EnumType ? ExcludeFromEnum<A, B> : A extends PrimitiveType ? ExcludeFromPrimitive<A, B> : A extends ArrayType ? ExcludeFromArray<A, B> : A extends TupleType ? ExcludeFromTuple<A, B> : A extends ObjectType ? ExcludeFromObject<A, B> : A extends UnionType ? DistributeUnion<A, B> : Never;

type index_Any<I extends boolean = false, D extends unknown = never> = Any<I, D>;
type index_Never = Never;
type index_Const<V, I extends boolean = false, D = never> = Const<V, I, D>;
type index_Enum<V, I extends boolean = false, D = never> = Enum<V, I, D>;
type index_Primitive<T extends null | boolean | number | string, I extends boolean = false, D extends unknown = never> = Primitive<T, I, D>;
type index_$Primitive<T, I = false, D = never> = $Primitive<T, I, D>;
type index_Tuple<V extends Type[], P extends Type = Never, I extends boolean = false, D extends unknown = never> = Tuple<V, P, I, D>;
type index_$Tuple<V, P = Never, I = false, D = never> = $Tuple<V, P, I, D>;
type index_Union<V extends Type> = Union<V>;
type index_$Union<V> = $Union<V>;
type index_AnyType = AnyType;
type index_NeverType = NeverType;
type index_ConstType = ConstType;
type index_EnumType = EnumType;
type index_PrimitiveType = PrimitiveType;
type index_ArrayType = ArrayType;
type index_TupleType = TupleType;
type index_ObjectType = ObjectType;
type index_UnionType = UnionType;
type index_Type = Type;
type index_$Resolve<T, O extends ResolveOptions = ResolveDefaultOptions> = $Resolve<T, O>;
type index_Resolve<T extends Type, O extends ResolveOptions = ResolveDefaultOptions> = Resolve<T, O>;
type index_$Intersect<A, B> = $Intersect<A, B>;
type index_Intersect<A extends Type, B extends Type> = Intersect<A, B>;
declare namespace index {
  export {
    index_Any as Any,
    index_Never as Never,
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
    index_AnyType as AnyType,
    index_NeverType as NeverType,
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
