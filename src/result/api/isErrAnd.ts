import { Result } from "../interfaces.js";

export function isErrAnd<T, E>(result: Result<T, E>, fn: (v: E) => boolean) {
  return result.isErr() && fn(result.unwrapErr());
}
