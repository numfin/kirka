import { Either } from "../interfaces";

export function andRight<L, R, U>(
  either: Either<L, R>,
  other_either: Either<L, U>
) {
  return either.andThenRight(() => other_either);
}
