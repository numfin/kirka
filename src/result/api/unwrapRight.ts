import { Either } from "../interfaces";

export function unwrapRight<L, R>(either: Either<L, R>) {
  if (either.isLeft()) {
    throw new Error(`unwrapRight called on ${either.format()}`);
  }
  return either.unwrap() as R;
}
