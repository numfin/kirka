import { Either } from "../interfaces";

export function inspectRight<L, R>(
  either: Either<L, R>,
  fn: (value: R) => void
) {
  either.mapRight(fn);
  return either;
}
