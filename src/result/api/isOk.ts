import { ResultUnion, Ok, tagOK } from "../base.js";

export function isOk<T, E>(result: ResultUnion<T, E>): result is Ok<T> {
  return result.type === tagOK;
}
