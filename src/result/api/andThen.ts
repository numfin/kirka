import { Result } from "../interfaces.js";
import { unionErr } from "./unionErr.js";

export function andThen<T, E, U = T>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
) {
  if (result.isOk()) {
    return fn(result.unwrap()).inner();
  }
  return unionErr(result.unwrapErr());
}
