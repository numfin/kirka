import { Result } from "../interfaces";

export function unwrapErr<T, E>(result: Result<T, E>) {
  if (result.isOk()) {
    throw new Error(`unwrapErr called on ${result.format()}`);
  }
  return result.inner().value as E;
}
