import { Either } from "../interfaces";
import { RightUnion } from "./RightUnion";

export function andThenLeft<L, R, U>(
  either: Either<L, R>,
  fn: (value: L) => Either<U, R>
) {
  if (either.isLeft()) {
    return fn(either.unwrap() as L).inner();
  }
  return RightUnion<R>(either.unwrap() as R);
}
