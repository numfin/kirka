import { ResultUnion, Ok } from "../interfaces.js";

export function isOk<T, E>(result: ResultUnion<T, E>): result is Ok<T> {
  return result.type === "Ok";
}
