import { Result, ResultUnion } from "../interfaces";

export function format<T, E>(
  result: Result<T, E>,
  formatter?: (result: Result<T, E>) => string
) {
  const inner = result.inner();
  return `Result.${inner.type}(${formatter?.(result) ?? inner.value})`;
}
