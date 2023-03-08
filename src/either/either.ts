import { None, Some } from "../option";
import { Option } from "../option/interfaces";
import { Either, EitherUnion } from "./interfaces";

export function create_either<L, R>(v: EitherUnion<L, R>): Either<L, R> {
  let inner = v;
  const api: Either<L, R> = {
    inner: () => inner,
    eq: (other: Either<L, R>) => EitherApi.eq(api, other),
    format: () => EitherApi.format(inner),
    isLeft: () => EitherApi.isLeft(inner),
    isRight: () => EitherApi.isRight(inner),
    unwrap: () => EitherApi.unwrap(inner),
    unwrapLeft: () => EitherApi.unwrapLeft(api),
    unwrapRight: () => EitherApi.unwrapRight(api),
    unwrapLeftOr: (default_value) => EitherApi.unwrapLeftOr(api, default_value),
    unwrapRightOr: (default_value) =>
      EitherApi.unwrapRightOr(api, default_value),
    isLeftAnd: (fn) => EitherApi.isLeftAnd(api, fn),
    isRightAnd: (fn) => EitherApi.isRightAnd(api, fn),
    mapLeft: (fn) => EitherApi.mapLeft(api, fn),
    mapRight: (fn) => EitherApi.mapRight(api, fn),
    inspectLeft: (fn) => EitherApi.inspectLeft(api, fn),
    inspectRight: (fn) => EitherApi.inspectRight(api, fn),
    andThenLeft: (fn) => EitherApi.andThenLeft(api, fn),
    andThenRight: (fn) => EitherApi.andThenRight(api, fn),
    andLeft: (new_value) => EitherApi.andLeft(api, new_value),
    andRight: (new_value) => EitherApi.andRight(api, new_value),
    toLeftOption: () => EitherApi.toLeftOption(api),
    toRightOption: () => EitherApi.toRightOption(api),
  };
  return api;
}

export function Left<L, R>(value: L) {
  return create_either<L, R>({ value, type: "Left" });
}
export function Right<L, R>(value: R) {
  return create_either<L, R>({ value, type: "Right" });
}
export namespace EitherApi {
  export function format<L, R>(either: EitherUnion<L, R>) {
    return `Either.${either.type}(${either.value})`;
  }
  export function eq<L, R>(self: Either<L, R>, other: Either<L, R>) {
    const a = self.inner();
    const b = other.inner();
    return a.type === b.type && a.value === b.value;
  }
  export function unwrap<L, R>(either: EitherUnion<L, R>) {
    return either.value;
  }
  export function isLeft<L, R>(either: EitherUnion<L, R>) {
    return either.type === "Left";
  }
  export function isRight<L, R>(either: EitherUnion<L, R>) {
    return either.type === "Right";
  }
  export function unwrapLeft<L, R>(either: Either<L, R>) {
    if (either.isRight()) {
      throw new Error(`unwrapLeft called on ${either.format()}`);
    }
    return either.unwrap() as L;
  }
  export function unwrapRight<L, R>(either: Either<L, R>) {
    if (either.isLeft()) {
      throw new Error(`unwrapRight called on ${either.format()}`);
    }
    return either.unwrap() as R;
  }
  export function unwrapLeftOr<L, R>(
    either: Either<L, R>,
    default_value: L
  ): L {
    return either.isLeft() ? (either.unwrap() as L) : default_value;
  }
  export function unwrapRightOr<L, R>(
    either: Either<L, R>,
    default_value: R
  ): R {
    return either.isRight() ? (either.unwrap() as R) : default_value;
  }
  export function isLeftAnd<L, R>(either: Either<L, R>, fn: (v: L) => boolean) {
    return either.isLeft() && fn(either.unwrap() as L);
  }
  export function isRightAnd<L, R>(
    either: Either<L, R>,
    fn: (v: R) => boolean
  ) {
    return either.isRight() && fn(either.unwrap() as R);
  }
  export function toLeftOption<L, R>(either: Either<L, R>): Option<L> {
    return either.isLeft() ? Some(either.unwrap() as L) : None();
  }
  export function toRightOption<L, R>(either: Either<L, R>): Option<R> {
    return either.isRight() ? Some(either.unwrap() as R) : None();
  }
  export function mapLeft<L, R, U>(
    either: Either<L, R>,
    fn: (value: L) => U
  ): Either<U, R> {
    if (either.isLeft()) {
      return Left<U, R>(fn(either.unwrap() as L));
    }
    return Right<U, R>(either.unwrap() as R);
  }
  export function mapRight<L, R, U>(
    either: Either<L, R>,
    fn: (value: R) => U
  ): Either<L, U> {
    if (either.isRight()) {
      return Right<L, U>(fn(either.unwrap() as R));
    }
    return Left<L, U>(either.unwrap() as L);
  }
  export function inspectLeft<L, R>(
    either: Either<L, R>,
    fn: (value: L) => void
  ) {
    either.mapLeft(fn);
    return either;
  }
  export function inspectRight<L, R>(
    either: Either<L, R>,
    fn: (value: R) => void
  ) {
    either.mapRight(fn);
    return either;
  }
  export function andThenLeft<L, R, U>(
    either: Either<L, R>,
    fn: (value: L) => Either<U, R>
  ): Either<U, R> {
    if (either.isLeft()) {
      return fn(either.unwrap() as L);
    }
    return Right<U, R>(either.unwrap() as R);
  }
  export function andThenRight<L, R, U>(
    either: Either<L, R>,
    fn: (value: R) => Either<L, U>
  ): Either<L, U> {
    if (either.isRight()) {
      return fn(either.unwrap() as R);
    }
    return Left<L, U>(either.unwrap() as L);
  }

  export function andLeft<L, R, U>(
    either: Either<L, R>,
    other_either: Either<U, R>
  ): Either<U, R> {
    return either.andThenLeft(() => other_either);
  }
  export function andRight<L, R, U>(
    either: Either<L, R>,
    other_either: Either<L, U>
  ): Either<L, U> {
    return either.andThenRight(() => other_either);
  }
}
