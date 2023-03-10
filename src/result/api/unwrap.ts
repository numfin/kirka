import { Result } from "../interfaces";

export function unwrap<T, E>(result: Result<T, E>) {
  const inner = result.inner();
  if (result.isErr()) {
    throw new Error(`unwrap() on ${result.format()}`);
  }
  return inner.value as T;
}
