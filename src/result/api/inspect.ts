import { Result } from "../interfaces.js";

export function inspect<T, E>(result: Result<T, E>, fn: (value: T) => void) {
  result.map(fn);
  return result;
}
