import { Result } from "../interfaces";

export function unwrapErrOr<T, E>(result: Result<T, E>, default_value: E): E {
  return result.isErr() ? result.unwrapErr() : default_value;
}
