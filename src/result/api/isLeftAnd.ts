import { Either } from "../interfaces";

export function isLeftAnd<L, R>(either: Either<L, R>, fn: (v: L) => boolean) {
  return either.isLeft() && fn(either.unwrap() as L);
}
