import { Result } from "../interfaces.js";

export function uwnrapOr<T, E>(result: Result<T, E>, default_value: T): T {
  return result.isOk() ? result.unwrap() : default_value;
}
