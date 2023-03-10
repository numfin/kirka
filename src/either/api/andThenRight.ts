import { Either } from "../interfaces";
import { LeftUnion } from "./LeftUnion";

export function andThenRight<L, R, U>(
  either: Either<L, R>,
  fn: (value: R) => Either<L, U>
) {
  if (either.isRight()) {
    return fn(either.unwrap() as R).inner();
  }
  return LeftUnion<L>(either.unwrap() as L);
}
