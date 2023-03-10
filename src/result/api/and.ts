import { Result } from "../interfaces";

export function and<T, E, U>(result: Result<T, E>, otherResult: Result<U, E>) {
  return result.andThen(() => otherResult);
}
