import { Either } from "../interfaces";
import { LeftUnion } from "./LeftUnion";
import { RightUnion } from "./RightUnion";

export function mapRight<L, R, U>(either: Either<L, R>, fn: (value: R) => U) {
  if (either.isRight()) {
    return RightUnion<U>(fn(either.unwrap() as R));
  }
  return LeftUnion<L>(either.unwrap() as L);
}
