import { Result } from "../interfaces";

export function inspect<T, E>(result: Result<T, E>, fn: (value: T) => void) {
  result.map(fn);
  return result;
}
