import type { Either } from "../either/interfaces";

export interface Some<T> {
  type: "Some";
  value: T;
}
export interface None {
  type: "None";
}

export type OptionUnion<T> = None | Some<T>;

export interface Option<T> {
  inner(): OptionUnion<T>;
  eq<U>(v: Option<T>, by?: (item: T) => U): boolean;
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
  toLeft<R>(defaultRight: () => R): Either<T, R>;
  toRight<L>(defaultLeft: () => L): Either<L, T>;
  filter(fn: (item: T) => boolean): Option<T>;
}
