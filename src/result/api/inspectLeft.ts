import { Either } from "../interfaces";

export function inspectLeft<L, R>(
  either: Either<L, R>,
  fn: (value: L) => void
) {
  either.mapLeft(fn);
  return either;
}
