import { ResultUnion, Err, tagErr } from "../base.js";

export function isErr<T, E>(result: ResultUnion<T, E>): result is Err<E> {
  return result.type === tagErr;
}
