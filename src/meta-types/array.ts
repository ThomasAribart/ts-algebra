import { Prettify } from "../utils";

import { Any } from "./any";
import { NeverType } from "./never";
import { Type } from "./type";
import { $Resolve } from "./resolve";

export type ArrayTypeId = "array";

// Prefixed with _ to not confuse with native Array type
export type _Array<V extends Type = Any> = _$Array<V>;

export type _$Array<V = Any> = { type: ArrayTypeId; values: V };

export type ArrayType = {
  type: ArrayTypeId;
  values: Type;
};

export type ArrayValues<A extends ArrayType> = A["values"];

export type ResolveArray<T extends ArrayType> = ArrayValues<T> extends NeverType
  ? []
  : Prettify<$Resolve<ArrayValues<T>>[]>;
