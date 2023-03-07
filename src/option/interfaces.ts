export interface Some<T> {
  type: "Some";
  value: T;
}
export interface None<T> {
  type: "None";
}

export type OptionUnion<T> = None<T> | Some<T>;

export interface Option<T> {
  format(): string;
  clone(): Option<T>;
  unwrap(): T;
  unwrapOr(v: T): T;
  isNone(): boolean;
  isSome(): boolean;
  take(): Option<T>;
  isSomeAnd(fn: (v: T) => boolean): boolean;
  map<U>(fn: (v: T) => U): Option<U>;
  or(v: Option<T>): Option<T>;
  orElse(fn: () => Option<T>): Option<T>;
  and<U>(v: Option<U>): Option<U>;
  andThen<U>(fn: (v: T) => Option<U>): Option<U>;
}
