import { ResultUnion } from "../interfaces";

export function format<T, E>(result: ResultUnion<T, E>) {
  return `Result.${result.type}(${result.value})`;
}
