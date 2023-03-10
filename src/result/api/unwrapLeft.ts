import { Either } from "../interfaces";

export function unwrapLeft<L, R>(either: Either<L, R>) {
  if (either.isRight()) {
    throw new Error(`unwrapLeft called on ${either.format()}`);
  }
  return either.unwrap() as L;
}
