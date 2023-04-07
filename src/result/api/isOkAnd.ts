import { Result } from "../interfaces.js";

export function isOkAnd<T, E>(result: Result<T, E>, fn: (v: T) => boolean) {
  return result.isOk() && fn(result.unwrap());
}
