import { Either } from "../interfaces";

export function andLeft<L, R, U>(
  either: Either<L, R>,
  other_either: Either<U, R>
) {
  return either.andThenLeft(() => other_either);
}
