import { Either } from "../interfaces";

export function unwrapRightOr<L, R>(either: Either<L, R>, default_value: R): R {
  return either.isRight() ? (either.unwrap() as R) : default_value;
}
