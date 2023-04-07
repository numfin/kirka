import { Result } from "../interfaces.js";

export function inspectErr<T, E>(result: Result<T, E>, fn: (value: E) => void) {
  result.mapErr(fn);
  return result;
}
