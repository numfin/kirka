import { Either } from "../interfaces";
import { LeftUnion } from "./LeftUnion";
import { RightUnion } from "./RightUnion";

export function mapLeft<L, R, U>(either: Either<L, R>, fn: (value: L) => U) {
  if (either.isLeft()) {
    return LeftUnion<U>(fn(either.unwrap() as L));
  }
  return RightUnion<R>(either.unwrap() as R);
}
