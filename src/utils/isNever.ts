export type IsNever<A> = (<T>() => T extends never ? true : false) extends <
  T
>() => T extends A ? true : false
  ? true
  : false;
