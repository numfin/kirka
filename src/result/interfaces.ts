import type { Option } from "../option/interfaces";

export interface Ok<T> {
  type: "Ok";
  value: T;
}
export interface Err<T> {
  type: "Err";
  value: T;
}
export type ResultUnion<L, R> = Ok<L> | Err<R>;

export interface Result<T, Err> {
  format(): string;
  eq(v: Result<T, Err>): boolean;
  inner(): ResultUnion<T, Err>;
  isOk(): boolean;
  isErr(): boolean;
  unwrap(): T;
  unwrapErr(): Err;
  unwrapOr(v: T): T;
  unwrapErrOr(v: Err): Err;
  isOkAnd(fn: (v: T) => boolean): boolean;
  isErrAnd(fn: (v: Err) => boolean): boolean;
  map<U>(fn: (v: T) => U): Result<U, Err>;
  mapErr<U>(fn: (v: Err) => U): Result<T, U>;
  inspect(fn: (v: T) => unknown): Result<T, Err>;
  inspectErr(fn: (v: Err) => unknown): Result<T, Err>;
  andThen<U>(fn: (v: T) => Result<U, Err>): Result<U, Err>;
  orElse<U>(fn: (v: Err) => Result<T, U>): Result<T, U>;
  and<U>(either: Result<U, Err>): Result<U, Err>;
  or<U>(either: Result<T, U>): Result<T, U>;
  ok(): Option<T>;
  err(): Option<Err>;
}
