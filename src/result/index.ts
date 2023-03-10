export { EitherFrom } from "./from";
export * from "./interfaces";

import { andLeft } from "./api/andLeft";
import { andRight } from "./api/andRight";
import { andThenLeft } from "./api/andThenLeft";
import { andThenRight } from "./api/andThenRight";
import { eq } from "./api/eq";
import { format } from "./api/format";
import { inspectLeft } from "./api/inspectLeft";
import { inspectRight } from "./api/inspectRight";
import { isLeft } from "./api/isLeft";
import { isLeftAnd } from "./api/isLeftAnd";
import { isRight } from "./api/isRight";
import { isRightAnd } from "./api/isRightAnd";
import { mapLeft } from "./api/mapLeft";
import { mapRight } from "./api/mapRight";
import { toLeftOption } from "./api/toLeftOption";
import { toRightOption } from "./api/toRightOption";
import { unwrap } from "./api/unwrap";
import { unwrapLeft } from "./api/unwrapLeft";
import { unwrapLeftOr } from "./api/unwrapLeftOr";
import { unwrapRight } from "./api/unwrapRight";
import { unwrapRightOr } from "./api/unwrapRightOr";
import type { Either, EitherUnion, Left, Right } from "./interfaces";

export function createEither<L, R>(v: EitherUnion<L, R>): Either<L, R> {
  let inner = v;
  const api: Either<L, R> = {
    inner: () => inner,
    eq: (other: Either<L, R>) => eq(api, other),
    format: () => format(inner),
    isLeft: () => isLeft(inner),
    isRight: () => isRight(inner),
    unwrap: () => unwrap(inner),
    unwrapLeft: () => unwrapLeft(api),
    unwrapRight: () => unwrapRight(api),
    unwrapLeftOr: (default_value) => unwrapLeftOr(api, default_value),
    unwrapRightOr: (default_value) => unwrapRightOr(api, default_value),
    isLeftAnd: (fn) => isLeftAnd(api, fn),
    isRightAnd: (fn) => isRightAnd(api, fn),
    mapLeft: (fn) => createEither(mapLeft(api, fn)),
    mapRight: (fn) => createEither(mapRight(api, fn)),
    inspectLeft: (fn) => inspectLeft(api, fn),
    inspectRight: (fn) => inspectRight(api, fn),
    andThenLeft: (fn) => createEither(andThenLeft(api, fn)),
    andThenRight: (fn) => createEither(andThenRight(api, fn)),
    andLeft: (new_value) => andLeft(api, new_value),
    andRight: (new_value) => andRight(api, new_value),
    toLeftOption: () => toLeftOption(api),
    toRightOption: () => toRightOption(api),
  };
  return api;
}

export function Left<L, R>(value: L) {
  return createEither<L, R>({ value, type: "Left" });
}
export function Right<L, R>(value: R) {
  return createEither<L, R>({ value, type: "Right" });
}
