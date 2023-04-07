import { Result } from "../interfaces.js";
import { unionOk } from "./unionOk.js";

export function orElse<T, E, U>(
  result: Result<T, E>,
  fn: (value: E) => Result<T, U>
) {
  if (result.isErr()) {
    return fn(result.unwrapErr()).inner();
  }
  return unionOk(result.unwrap());
}
