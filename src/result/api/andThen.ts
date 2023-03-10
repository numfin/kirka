import { Result } from "../interfaces";
import { unionErr } from "./unionErr";

export function andThen<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
) {
  if (result.isOk()) {
    return fn(result.unwrap()).inner();
  }
  return unionErr(result.unwrapErr());
}
