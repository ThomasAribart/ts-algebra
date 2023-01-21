declare type NeverTypeId = "never";
declare type Never = {
    type: NeverTypeId;
};
declare type NeverType = Never;
declare type ResolveNever = never;

declare type And<A, B> = A extends true ? B extends true ? true : false : false;

declare type DoesExtend<A, B> = A extends B ? true : false;
declare type ArrayKeys = keyof [];
declare type IsObject<T> = T extends object ? ArrayKeys extends Extract<keyof T, ArrayKeys> ? false : true : false;
declare type IsArray<T> = T extends object ? ArrayKeys extends Extract<keyof T, ArrayKeys> ? true : false : false;

declare type If<I extends boolean, T, E> = I extends true ? T : E;

declare type IntersectUnion$1<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

declare type IsNever<A> = (<T>() => T extends never ? true : false) extends <T>() => T extends A ? true : false ? true : false;

declare type DeepMergeUnsafe<A, B> = IsObject<A> extends true ? IsObject<B> extends true ? {
    [K in keyof (A & B)]: K extends keyof B ? K extends keyof A ? DeepMergeUnsafe<A[K], B[K]> : B[K] : K extends keyof A ? A[K] : never;
} : B : IsArray<A> extends true ? IsArray<B> extends true ? B extends unknown[] ? [
    ...(A extends unknown[] ? A : never),
    B
] : never : B : B;

declare type Not<A> = A extends false ? true : A extends true ? false : never;

declare type Or<A, B> = A extends true ? true : B extends true ? true : false;

declare type Prettify<T> = IsObject<T> extends true ? {
    [K in keyof T]: K extends keyof T ? T[K] : never;
} : T;

declare type Tail<L extends unknown[]> = L extends readonly [] ? L : L extends readonly [unknown?, ...infer T] ? T : L;

declare type UnionLast<U> = IntersectUnion$1<U extends unknown ? (x: U) => void : never> extends (x: infer P) => void ? P : never;

declare type UnionPop<U> = Exclude<U, UnionLast<U>>;

declare type EnumTypeId = "enum";
declare type Enum<V, I extends boolean = false, D = never> = If<IsNever<V>, Never, {
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
declare type $Primitive<T, I = false, D = never> = If<IsNever<T>, Never, {
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
declare type IsAnyValueNever<V> = V extends [infer H, ...infer T] ? H extends NeverType ? true : IsAnyValueNever<T> : false;
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
declare type ResolveTuple<T extends TupleType, O extends ResolveOptions> = And<O["deserialize"], IsSerialized<T>> extends true ? Deserialized<T> : IsTupleOpen<T> extends true ? [...RecurseOnTuple<TupleValues<T>, O>, ...Resolve<TupleOpenProps<T>, O>[]] : RecurseOnTuple<TupleValues<T>, O>;
declare type RecurseOnTuple<V extends Type[], O extends ResolveOptions, R extends any[] = []> = V extends [infer H, ...infer T] ? H extends Type ? T extends Type[] ? RecurseOnTuple<T, O, [...R, Resolve<H, O>]> : never : never : R;

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
declare type $Union<V> = If<IsNever<V>, Never, DoesExtend<V, NeverType> extends true ? Never : {
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

declare type Type = NeverType | AnyType | ConstType | EnumType | PrimitiveType | ArrayType | TupleType | ObjectType | UnionType;
declare type SerializableType = Type extends infer U ? U extends {
    isSerialized: boolean;
    deserialized: unknown;
} ? U : never : never;

declare type IsSerialized<T extends SerializableType> = T["isSerialized"];
declare type Deserialized<T extends SerializableType> = T["deserialized"];

declare type ConstTypeId = "const";
declare type Const<V, I extends boolean = false, D = never> = If<IsNever<V>, Never, {
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

declare type IntersectUnion<A extends UnionType, B> = B extends Type ? B extends NeverType ? B : B extends AnyType ? A : B extends ConstType ? DistributeIntersection<A, B> : B extends EnumType ? DistributeIntersection<A, B> : B extends PrimitiveType ? DistributeIntersection<A, B> : B extends ArrayType ? DistributeIntersection<A, B> : B extends TupleType ? DistributeIntersection<A, B> : B extends ObjectType ? DistributeIntersection<A, B> : B extends UnionType ? DistributeIntersection<A, B> : Never : Never;
declare type DistributeIntersection<A extends UnionType, B> = $Union<RecurseOnUnionValues$1<UnionValues<A>, B>>;
declare type RecurseOnUnionValues$1<V extends Type, B> = V extends infer T ? $Intersect<T, B> : never;

declare type IntersectIsSerialized<A extends SerializableType, B extends SerializableType> = Or<IsSerialized<A>, IsSerialized<B>>;
declare type IntersectDeserialized<A extends SerializableType, B extends SerializableType> = IsSerialized<A> extends true ? IsSerialized<B> extends true ? Deserialized<A> & Deserialized<B> : Deserialized<A> : IsSerialized<B> extends true ? Deserialized<B> : never;

declare type MergeConstToSerializable<A extends ConstType, B extends SerializableType> = Const<ConstValue<A>, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;
declare type IntersectConst<A extends ConstType, B> = B extends Type ? B extends NeverType ? B : B extends AnyType ? MergeConstToSerializable<A, B> : B extends ConstType ? CheckExtendsResolved<A, B> : B extends EnumType ? IntersectConstToEnum<A, B> : B extends PrimitiveType ? IntersectConstToPrimitive<A, B> : B extends ArrayType ? IntersectConstToArray<A, B> : B extends TupleType ? IntersectConstToTuple<A, B> : B extends ObjectType ? IntersectConstToObject<A, B> : B extends UnionType ? DistributeIntersection<B, A> : Never : Never;
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
declare type IntersectEnum<A extends EnumType, B> = B extends Type ? B extends NeverType ? B : B extends AnyType ? MergeEnumValuesToSerializable<EnumValues<A>, A, B> : B extends ConstType ? IntersectConstToEnum<B, A> : B extends EnumType ? FilterUnintersecting<A, B> : B extends PrimitiveType ? IntersectEnumToPrimitive<A, B> : B extends ArrayType ? FilterUnintersecting<A, B> : B extends TupleType ? FilterUnintersecting<A, B> : B extends ObjectType ? FilterUnintersecting<A, B> : B extends UnionType ? DistributeIntersection<B, A> : Never : Never;
declare type FilterUnintersecting<A extends EnumType, B extends SerializableType> = MergeEnumValuesToSerializable<RecurseOnEnumValues$1<EnumValues<A>, B>, A, B>;
declare type RecurseOnEnumValues$1<V, B> = V extends infer T ? $Intersect<Const<T>, B> extends Never ? never : T : never;
declare type IntersectEnumToPrimitive<A extends EnumType, B extends PrimitiveType> = FilterUnintersecting<A, B>;
declare type IntersectEnumToArray<A extends EnumType, B extends ArrayType> = FilterUnintersecting<A, B>;
declare type IntersectEnumToTuple<A extends EnumType, B extends TupleType> = FilterUnintersecting<A, B>;
declare type IntersectEnumToObject<A extends EnumType, B extends ObjectType> = FilterUnintersecting<A, B>;

declare type MergePrimitiveToSerializable<A extends PrimitiveType, B extends SerializableType> = Primitive<PrimitiveValue<A>, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;
declare type IntersectPrimitive<A extends PrimitiveType, B> = B extends Type ? B extends NeverType ? B : B extends AnyType ? MergePrimitiveToSerializable<A, B> : B extends ConstType ? IntersectConstToPrimitive<B, A> : B extends EnumType ? IntersectEnumToPrimitive<B, A> : B extends PrimitiveType ? If<And<DoesExtend<PrimitiveValue<A>, PrimitiveValue<B>>, DoesExtend<PrimitiveValue<B>, PrimitiveValue<A>>>, MergePrimitiveToSerializable<A, B>, Never> : B extends ArrayType ? Never : B extends TupleType ? Never : B extends ObjectType ? Never : B extends UnionType ? DistributeIntersection<B, A> : Never : Never;

declare type MergeTuplePropsToSerializable<V extends Type[], P extends Type, A extends TupleType, B extends SerializableType> = $MergeTuplePropsToSerializable<V, P, A, B>;
declare type $MergeTuplePropsToSerializable<V, P, A extends TupleType, B extends SerializableType> = $Tuple<V, P, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;
declare type IntersectTuple<A extends TupleType, B> = B extends NeverType ? B : B extends AnyType ? MergeTuplePropsToSerializable<TupleValues<A>, TupleOpenProps<A>, A, B> : B extends ConstType ? IntersectConstToTuple<B, A> : B extends EnumType ? IntersectEnumToTuple<B, A> : B extends PrimitiveType ? Never : B extends ArrayType ? IntersectTupleToArray<A, B> : B extends TupleType ? IntersectTuples<A, B> : B extends ObjectType ? Never : B extends UnionType ? DistributeIntersection<B, A> : Never;
declare type IntersectTupleToArray<T extends TupleType, A extends ArrayType, V extends any[] = IntersectTupleToArrayValues<TupleValues<T>, ArrayValues<A>>, O = $Intersect<TupleOpenProps<T>, ArrayValues<A>>> = $MergeTuplePropsToSerializable<V, O, T, A>;
declare type IntersectTupleToArrayValues<V extends Type[], T extends Type, R extends any[] = []> = V extends [infer H, ...infer Tl] ? H extends Type ? Tl extends Type[] ? IntersectTupleToArrayValues<Tl, T, [...R, Intersect<H, T>]> : never : never : R;
declare type IntersectTuples<A extends TupleType, B extends TupleType, V extends any[] = IntersectTupleValues<TupleValues<A>, TupleValues<B>, IsTupleOpen<A>, IsTupleOpen<B>, TupleOpenProps<A>, TupleOpenProps<B>>, O = $Intersect<TupleOpenProps<A>, TupleOpenProps<B>>> = $MergeTuplePropsToSerializable<V, O, A, B>;
declare type IntersectTupleValues<V1 extends Type[], V2 extends Type[], O1 extends boolean, O2 extends boolean, P1 extends Type, P2 extends Type, R extends any[] = []> = V1 extends [infer H1, ...infer T1] ? H1 extends Type ? T1 extends Type[] ? V2 extends [infer H2, ...infer T2] ? H2 extends Type ? T2 extends Type[] ? IntersectTupleValues<T1, T2, O1, O2, P1, P2, [
    ...R,
    Intersect<H1, H2>
]> : never : never : IntersectTupleValues<T1, V2, O1, O2, P1, P2, [
    ...R,
    O2 extends true ? Intersect<H1, P2> : Never
]> : never : never : V2 extends [infer H2, ...infer T2] ? H2 extends Type ? T2 extends Type[] ? IntersectTupleValues<V1, T2, O1, O2, P1, P2, [
    ...R,
    O1 extends true ? Intersect<H2, P1> : Never
]> : never : never : R;

declare type MergeArrayValuesToSerializable<V extends Type, A extends ArrayType, B extends SerializableType> = $MergeArrayValuesToSerializable<V, A, B>;
declare type $MergeArrayValuesToSerializable<V, A extends ArrayType, B extends SerializableType> = _$Array<V, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;
declare type IntersectArray<A extends ArrayType, B> = B extends Type ? B extends NeverType ? B : B extends AnyType ? MergeArrayValuesToSerializable<ArrayValues<A>, A, B> : B extends ConstType ? IntersectConstToArray<B, A> : B extends EnumType ? IntersectEnumToArray<B, A> : B extends PrimitiveType ? Never : B extends ArrayType ? IntersectArrays<A, B> : B extends TupleType ? IntersectTupleToArray<B, A> : B extends ObjectType ? Never : B extends UnionType ? DistributeIntersection<B, A> : Never : Never;
declare type IntersectArrays<A extends ArrayType, B extends ArrayType> = $MergeArrayValuesToSerializable<Intersect<ArrayValues<A>, ArrayValues<B>>, A, B>;

declare type MergeObjectPropsToSerializable<V extends Record<string, Type>, R extends string, P extends Type, A extends ObjectType, B extends SerializableType> = $MergeObjectPropsToSerializable<V, R, P, A, B>;
declare type $MergeObjectPropsToSerializable<V, R, P, A extends ObjectType, B extends SerializableType> = _$Object<V, R, P, IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>>;
declare type IntersectObject<A extends ObjectType, B> = B extends Type ? B extends NeverType ? B : B extends AnyType ? MergeObjectPropsToSerializable<ObjectValues<A>, ObjectRequiredKeys<A>, ObjectOpenProps<A>, A, B> : B extends ConstType ? IntersectConstToObject<B, A> : B extends EnumType ? IntersectEnumToObject<B, A> : B extends PrimitiveType ? Never : B extends ArrayType ? Never : B extends TupleType ? Never : B extends ObjectType ? IntersectObjects<A, B> : B extends UnionType ? DistributeIntersection<B, A> : Never : Never;
declare type IntersectObjects<A extends ObjectType, B extends ObjectType, V extends Record<string, any> = IntersectObjectsValues<A, B>, O = Intersect<ObjectOpenProps<A>, ObjectOpenProps<B>>> = $MergeObjectPropsToSerializable<{
    [key in keyof V]: V[key];
}, ObjectRequiredKeys<A> | ObjectRequiredKeys<B>, O, A, B>;
declare type IntersectObjectsValues<A extends ObjectType, B extends ObjectType> = {
    [key in Extract<keyof ObjectValues<A> | keyof ObjectValues<B>, string>]: $Intersect<ObjectValue<A, key>, ObjectValue<B, key>>;
};

declare type IntersectAny<A extends AnyType, B> = B extends Type ? B extends NeverType ? B : B extends AnyType ? Any<IntersectIsSerialized<A, B>, IntersectDeserialized<A, B>> : B extends ConstType ? MergeConstToSerializable<B, A> : B extends EnumType ? MergeEnumValuesToSerializable<EnumValues<B>, B, A> : B extends PrimitiveType ? MergePrimitiveToSerializable<B, A> : B extends ArrayType ? MergeArrayValuesToSerializable<ArrayValues<B>, B, A> : B extends TupleType ? MergeTuplePropsToSerializable<TupleValues<B>, TupleOpenProps<B>, B, A> : B extends ObjectType ? MergeObjectPropsToSerializable<ObjectValues<B>, ObjectRequiredKeys<B>, ObjectOpenProps<B>, B, A> : B extends UnionType ? DistributeIntersection<B, A> : Never : Never;

declare type Intersect<A extends Type, B extends Type> = $Intersect<A, B>;
declare type $Intersect<A, B> = A extends NeverType ? A : A extends AnyType ? IntersectAny<A, B> : A extends ConstType ? IntersectConst<A, B> : A extends EnumType ? IntersectEnum<A, B> : A extends PrimitiveType ? IntersectPrimitive<A, B> : A extends ArrayType ? IntersectArray<A, B> : A extends TupleType ? IntersectTuple<A, B> : A extends ObjectType ? IntersectObject<A, B> : A extends UnionType ? IntersectUnion<A, B> : Never;

declare type DistributeUnion<A extends UnionType, B> = $Union<RecurseOnUnionValues<UnionValues<A>, B>>;
declare type RecurseOnUnionValues<V extends Type, B> = V extends infer T ? _$Exclude<T, B> : never;
declare type ExcludeUnion<A, B extends UnionType> = If<IsNever<UnionValues<B>>, A, ExcludeUnionValue<A, UnionLast<UnionValues<B>>, B>>;
declare type ExcludeUnionValue<A, V, B extends UnionType> = $Intersect<_$Exclude<A, V>, _$Exclude<A, $Union<Exclude<UnionValues<B>, V>>>>;

declare type ExcludeFromAny<A extends AnyType, B> = B extends Type ? B extends NeverType ? A : B extends AnyType ? Never : B extends ConstType ? A : B extends EnumType ? A : B extends PrimitiveType ? A : B extends ArrayType ? A : B extends TupleType ? A : B extends ObjectType ? A : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;

declare type ExcludeFromConst<A extends ConstType, B> = B extends Type ? B extends NeverType ? A : B extends AnyType ? Never : B extends ConstType ? CheckNotExtendsResolved<A, B> : B extends EnumType ? CheckNotExtendsResolved<A, B> : B extends PrimitiveType ? CheckNotExtendsResolved<A, B> : B extends ArrayType ? CheckNotExtendsResolved<A, B> : B extends TupleType ? CheckNotExtendsResolved<A, B> : B extends ObjectType ? ExcludeObject<A, B> : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;
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

declare type ExcludeFromEnum<A extends EnumType, B> = B extends Type ? B extends NeverType ? A : B extends AnyType ? Never : B extends ConstType ? FilterSubstracted<A, B> : B extends EnumType ? FilterSubstracted<A, B> : B extends PrimitiveType ? FilterSubstracted<A, B> : B extends ArrayType ? FilterSubstracted<A, B> : B extends TupleType ? FilterSubstracted<A, B> : B extends ObjectType ? FilterSubstracted<A, B> : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;
declare type FilterSubstracted<A extends EnumType, B extends Type> = Enum<RecurseOnEnumValues<EnumValues<A>, B>>;
declare type RecurseOnEnumValues<V, B extends Type> = V extends infer EnumValue ? _Exclude<Const<EnumValue>, B> extends NeverType ? never : EnumValue : never;
declare type ExcludeEnum<A extends Type, B extends EnumType, V = EnumValues<B>> = ExcludeEnumValue<A, UnionLast<V>, V>;
declare type ExcludeEnumValue<A extends Type, L, V> = $Intersect<_Exclude<A, Const<L>>, _Exclude<A, Enum<Exclude<V, L>>>>;

declare type ExcludeFromPrimitive<A extends PrimitiveType, B> = B extends Type ? B extends NeverType ? A : B extends AnyType ? Never : B extends ConstType ? A : B extends EnumType ? A : B extends PrimitiveType ? PrimitiveValue<A> extends PrimitiveValue<B> ? Never : A : B extends ArrayType ? A : B extends TupleType ? A : B extends ObjectType ? A : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;

declare type ExcludeFromArray<A extends ArrayType, B> = B extends Type ? B extends NeverType ? A : B extends AnyType ? Never : B extends ConstType ? A : B extends EnumType ? A : B extends PrimitiveType ? A : B extends ArrayType ? ExcludeArrays<A, B> : B extends TupleType ? And<DoesExtend<TupleValues<B>, []>, IsTupleOpen<B>> extends true ? ExcludeArrays<A, _Array<TupleOpenProps<B>>> : A : B extends ObjectType ? A : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;
declare type ExcludeArrays<A extends ArrayType, B extends ArrayType> = _Exclude<ArrayValues<A>, ArrayValues<B>> extends NeverType ? NeverType : A;

declare type CrossValue<V1 extends Type, P1 extends boolean, R1 extends boolean, V2 extends Type, P2 extends boolean, R2 extends boolean> = {
    originValue: V1;
    isPossibleInOrigin: P1;
    isRequiredInOrigin: R1;
    isPossibleInSubstracted: P2;
    isRequiredInSubstracted: R2;
    exclusionResult: _$Exclude<V1, V2>;
};
declare type CrossValueType = {
    originValue: Type;
    isPossibleInOrigin: boolean;
    isRequiredInOrigin: boolean;
    isPossibleInSubstracted: boolean;
    isRequiredInSubstracted: boolean;
    exclusionResult: any;
};
declare type OriginValue<C extends CrossValueType> = C["originValue"];
declare type IsPossibleInOrigin<C extends CrossValueType> = C["isPossibleInOrigin"];
declare type IsRequiredInOrigin<C extends CrossValueType> = C["isRequiredInOrigin"];
declare type IsPossibleInSubstracted<C extends CrossValueType> = C["isPossibleInSubstracted"];
declare type IsRequiredInSubstracted<C extends CrossValueType> = C["isRequiredInSubstracted"];
declare type ExclusionResult<C extends CrossValueType> = C["exclusionResult"];
declare type IsOutsideOfOriginScope<C extends CrossValueType> = And<IsRequiredInSubstracted<C>, Not<IsPossibleInOrigin<C>>>;
declare type IsOutsideOfSubstractedScope<C extends CrossValueType> = And<IsRequiredInOrigin<C>, Not<IsPossibleInSubstracted<C>>>;
declare type Propagate<C extends CrossValueType> = ExclusionResult<C> extends NeverType ? OriginValue<C> : ExclusionResult<C>;
declare type IsOmittable<C extends CrossValueType> = And<Not<IsRequiredInOrigin<C>>, IsRequiredInSubstracted<C>>;

declare type ExcludeFromTuple<A extends TupleType, B> = B extends Type ? B extends NeverType ? A : B extends AnyType ? Never : B extends ConstType ? ExcludeConst<A, B> : B extends EnumType ? ExcludeEnum<A, B> : B extends PrimitiveType ? A : B extends ArrayType ? ExcludeArray<A, B> : B extends TupleType ? ExcludeTuples<A, B> : B extends ObjectType ? A : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;
declare type ExcludeArray<A extends TupleType, B extends ArrayType> = ExcludeTuples<A, Tuple<[], ArrayValues<B>, IsSerialized<B>, Deserialized<B>>>;
declare type ExcludeTuples<A extends TupleType, B extends TupleType, C extends CrossValueType[] = CrossTupleValues<TupleValues<A>, TupleValues<B>, IsTupleOpen<A>, IsTupleOpen<B>, TupleOpenProps<A>, TupleOpenProps<B>>, N extends CrossValueType[] = NonNeverItems<C>, P = _Exclude<TupleOpenProps<A>, TupleOpenProps<B>>, I = Not<DoesExtend<P, NeverType>>> = DoesTupleSizesMatch<A, B, C> extends true ? {
    moreThanTwo: A;
    onlyOne: $Tuple<PropagateExclusion$1<C>, TupleOpenProps<A>, IsSerialized<A>, Deserialized<A>>;
    none: OmitOmittableItems<A, C>;
}[And<IsTupleOpen<A>, I> extends true ? "moreThanTwo" : GetTupleLength<N>] : A;
declare type CrossTupleValues<V1 extends Type[], V2 extends Type[], O1 extends boolean, O2 extends boolean, P1 extends Type, P2 extends Type, C extends CrossValueType[] = []> = V1 extends [infer H1, ...infer T1] ? H1 extends Type ? T1 extends Type[] ? V2 extends [infer H2, ...infer T2] ? H2 extends Type ? T2 extends Type[] ? CrossTupleValues<T1, T2, O1, O2, P1, P2, [
    ...C,
    CrossValue<H1, true, true, H2, true, true>
]> : never : never : CrossTupleValues<T1, [
], O1, O2, P1, P2, [
    ...C,
    CrossValue<H1, true, true, P2, O2, false>
]> : never : never : V2 extends [infer H2, ...infer T2] ? H2 extends Type ? T2 extends Type[] ? CrossTupleValues<[
], T2, O1, O2, P1, P2, [
    ...C,
    CrossValue<P1, O1, false, H2, true, true>
]> : never : never : C;
declare type GetTupleLength<T extends any[], R extends any[] = Tail<T>> = If<DoesExtend<T, []>, "none", If<DoesExtend<R, []>, "onlyOne", "moreThanTwo">>;
declare type DoesTupleSizesMatch<S extends TupleType, E extends TupleType, C extends CrossValueType[]> = And<IsTupleOpen<S>, Not<IsTupleOpen<E>>> extends true ? false : And<IsSubstractedSmallEnough$1<C>, IsSubstractedBigEnough$1<C>>;
declare type IsSubstractedSmallEnough$1<C extends CrossValueType[]> = C extends [
    infer H,
    ...infer T
] ? H extends CrossValueType ? T extends CrossValueType[] ? IsOutsideOfOriginScope<H> extends true ? false : IsSubstractedSmallEnough$1<T> : never : never : true;
declare type IsSubstractedBigEnough$1<C extends CrossValueType[]> = C extends [
    infer H,
    ...infer T
] ? H extends CrossValueType ? T extends CrossValueType[] ? IsOutsideOfSubstractedScope<H> extends true ? false : IsSubstractedBigEnough$1<T> : never : never : true;
declare type NonNeverItems<C extends CrossValueType[], R extends CrossValueType[] = []> = C extends [infer H, ...infer T] ? H extends CrossValueType ? T extends CrossValueType[] ? ExclusionResult<H> extends NeverType ? NonNeverItems<T, R> : NonNeverItems<T, [...R, H]> : never : never : R;
declare type PropagateExclusion$1<C extends CrossValueType[], R extends any[] = []> = C extends [infer H, ...infer T] ? H extends CrossValueType ? T extends CrossValueType[] ? PropagateExclusion$1<T, [...R, Propagate<H>]> : never : never : R;
declare type OmitOmittableItems<S extends TupleType, C extends CrossValueType[], I extends CrossValueType[] = OmittableItems<C>> = {
    moreThanTwo: S;
    onlyOne: $Tuple<RequiredTupleValues<C>, Never, IsSerialized<S>, Deserialized<S>>;
    none: Never;
}[GetTupleLength<I>];
declare type OmittableItems<C extends CrossValueType[], R extends CrossValueType[] = []> = C extends [infer H, ...infer T] ? H extends CrossValueType ? T extends CrossValueType[] ? IsOmittable<H> extends true ? OmittableItems<T, [...R, H]> : OmittableItems<T, R> : never : never : R;
declare type RequiredTupleValues<C extends CrossValueType[], R extends Type[] = []> = C extends [infer H, ...infer T] ? H extends CrossValueType ? T extends CrossValueType[] ? IsOmittable<H> extends true ? R : RequiredTupleValues<T, [...R, OriginValue<H>]> : never : never : R;
declare type ExcludeConst<A extends TupleType, B extends ConstType, V = ConstValue<B>> = V extends any[] ? _Exclude<A, $Tuple<ExtractConstValues<V>, Never, IsSerialized<B>, Deserialized<B>>> : A;
declare type ExtractConstValues<V extends any[], R extends any[] = []> = V extends [
    infer H,
    ...infer T
] ? ExtractConstValues<T, [...R, Const<H>]> : R;

declare type ExcludeFromObject<A extends ObjectType, B> = B extends Type ? B extends NeverType ? A : B extends AnyType ? Never : B extends ConstType ? ExcludeConstFromObject<A, B> : B extends EnumType ? ExcludeEnum<A, B> : B extends PrimitiveType ? A : B extends ArrayType ? A : B extends TupleType ? A : B extends ObjectType ? ExcludeObjects<A, B> : B extends UnionType ? ExcludeUnion<A, B> : Never : Never;
declare type ExcludeObjects<A extends ObjectType, B extends ObjectType, C extends Record<string, CrossValueType> = ExcludeObjectValues<A, B>, R extends string = NonNeverKeys<C>, P = _Exclude<ObjectOpenProps<A>, ObjectOpenProps<B>>> = DoesObjectSizesMatch<A, B, C> extends true ? {
    moreThanTwo: A;
    onlyOne: PropagateExclusion<A, C>;
    none: OmitOmittableKeys<A, C>;
}[And<IsObjectOpen<A>, Not<DoesExtend<P, NeverType>>> extends true ? "moreThanTwo" : GetUnionLength<R>] : A;
declare type ExcludeObjectValues<A extends ObjectType, B extends ObjectType> = {
    [key in Extract<keyof ObjectValues<A> | keyof ObjectValues<B> | ObjectRequiredKeys<A> | ObjectRequiredKeys<B>, string>]: CrossValue<ObjectValue<A, key>, IsPossibleIn<A, key>, IsRequiredIn<A, key>, ObjectValue<B, key>, IsPossibleIn<B, key>, IsRequiredIn<B, key>>;
};
declare type GetUnionLength<U> = If<IsNever<U>, "none", If<IsNever<UnionPop<U>>, "onlyOne", "moreThanTwo">>;
declare type IsPossibleIn<O extends ObjectType, K extends string> = Or<DoesExtend<K, keyof ObjectValues<O>>, IsObjectOpen<O>>;
declare type IsRequiredIn<O extends ObjectType, K extends string> = DoesExtend<K, ObjectRequiredKeys<O>>;
declare type DoesObjectSizesMatch<A extends ObjectType, B extends ObjectType, C extends Record<string, CrossValueType>> = And<IsObjectOpen<A>, Not<IsObjectOpen<B>>> extends true ? false : And<IsSubstractedSmallEnough<C>, IsSubstractedBigEnough<C>>;
declare type IsSubstractedSmallEnough<C extends Record<string, CrossValueType>> = Not<DoesExtend<true, {
    [key in keyof C]: IsOutsideOfOriginScope<C[key]>;
}[keyof C]>>;
declare type IsSubstractedBigEnough<C extends Record<string, CrossValueType>> = Not<DoesExtend<true, {
    [key in keyof C]: IsOutsideOfSubstractedScope<C[key]>;
}[keyof C]>>;
declare type NonNeverKeys<C extends Record<string, CrossValueType>> = {
    [key in Extract<keyof C, string>]: ExclusionResult<C[key]> extends NeverType ? never : key;
}[Extract<keyof C, string>];
declare type PropagateExclusion<A extends ObjectType, C extends Record<string, CrossValueType>> = _Object<{
    [key in keyof C]: Propagate<C[key]>;
}, ObjectRequiredKeys<A>, ObjectOpenProps<A>, IsSerialized<A>, Deserialized<A>>;
declare type OmitOmittableKeys<A extends ObjectType, C extends Record<string, CrossValueType>, K extends string = OmittableKeys<C>> = {
    moreThanTwo: A;
    onlyOne: _Object<{
        [key in keyof C]: key extends K ? Never : OriginValue<C[key]>;
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
declare type _$Exclude<A, B> = A extends NeverType ? A : A extends AnyType ? ExcludeFromAny<A, B> : A extends ConstType ? ExcludeFromConst<A, B> : A extends EnumType ? ExcludeFromEnum<A, B> : A extends PrimitiveType ? ExcludeFromPrimitive<A, B> : A extends ArrayType ? ExcludeFromArray<A, B> : A extends TupleType ? ExcludeFromTuple<A, B> : A extends ObjectType ? ExcludeFromObject<A, B> : A extends UnionType ? DistributeUnion<A, B> : Never;

type index_Never = Never;
type index_Any<I extends boolean = false, D extends unknown = never> = Any<I, D>;
type index_Const<V, I extends boolean = false, D = never> = Const<V, I, D>;
type index_Enum<V, I extends boolean = false, D = never> = Enum<V, I, D>;
type index_Primitive<T extends null | boolean | number | string, I extends boolean = false, D extends unknown = never> = Primitive<T, I, D>;
type index_$Primitive<T, I = false, D = never> = $Primitive<T, I, D>;
type index_Tuple<V extends Type[], P extends Type = Never, I extends boolean = false, D extends unknown = never> = Tuple<V, P, I, D>;
type index_$Tuple<V, P = Never, I = false, D = never> = $Tuple<V, P, I, D>;
type index_Union<V extends Type> = Union<V>;
type index_$Union<V> = $Union<V>;
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
type index_$Resolve<T, O extends ResolveOptions = ResolveDefaultOptions> = $Resolve<T, O>;
type index_Resolve<T extends Type, O extends ResolveOptions = ResolveDefaultOptions> = Resolve<T, O>;
type index_$Intersect<A, B> = $Intersect<A, B>;
type index_Intersect<A extends Type, B extends Type> = Intersect<A, B>;
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
