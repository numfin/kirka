import { ResultUnion, Err } from "../interfaces";

export function isErr<T, E>(result: ResultUnion<T, E>): result is Err<E> {
  return result.type === "Err";
}
