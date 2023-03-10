import { Either } from "../interfaces";

export function isRightAnd<L, R>(either: Either<L, R>, fn: (v: R) => boolean) {
  return either.isRight() && fn(either.unwrap() as R);
}
