import { Result } from "../interfaces";

export function or<T, E, U>(result: Result<T, E>, otherResult: Result<T, U>) {
  return result.orElse(() => otherResult);
}
