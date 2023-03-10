import { Result } from "../interfaces";
import { unionOk } from "./unionOk";

export function orElse<T, E, U>(
  result: Result<T, E>,
  fn: (value: E) => Result<T, U>
) {
  if (result.isErr()) {
    return fn(result.unwrapErr()).inner();
  }
  return unionOk(result.unwrap());
}
