import { Either } from "../interfaces";

export function unwrapLeftOr<L, R>(either: Either<L, R>, default_value: L): L {
  return either.isLeft() ? (either.unwrap() as L) : default_value;
}
