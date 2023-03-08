import type { Option } from "../option/interfaces";

export interface Left<T> {
  type: "Left";
  value: T;
}
export interface Right<T> {
  type: "Right";
  value: T;
}
export type EitherUnion<L, R> = Left<L> | Right<R>;

export interface Either<L, R> {
  format(): string;
  eq(v: Either<L, R>): boolean;
  inner(): EitherUnion<L, R>;
  isLeft(): boolean;
  isRight(): boolean;
  unwrap(): L | R;
  unwrapLeft(): L;
  unwrapRight(): R;
  unwrapLeftOr(v: L): L;
  unwrapRightOr(v: R): R;
  isLeftAnd(fn: (v: L) => boolean): boolean;
  isRightAnd(fn: (v: R) => boolean): boolean;
  mapLeft<U>(fn: (v: L) => U): Either<U, R>;
  mapRight<U>(fn: (v: R) => U): Either<L, U>;
  inspectLeft(fn: (v: L) => unknown): Either<L, R>;
  inspectRight(fn: (v: R) => unknown): Either<L, R>;
  andThenLeft<U>(fn: (v: L) => Either<U, R>): Either<U, R>;
  andThenRight<U>(fn: (v: R) => Either<L, U>): Either<L, U>;
  andLeft<U>(either: Either<U, R>): Either<U, R>;
  andRight<U>(either: Either<L, U>): Either<L, U>;
  toLeftOption(): Option<L>;
  toRightOption(): Option<R>;
}
