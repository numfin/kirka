import { ResultUnion } from "../interfaces.js";

export function match<T, E, U>(
  source: ResultUnion<T, E>,
  onOk: (v: T) => U,
  onErr: (e: E) => U
): U {
  if (source.type === "Ok") {
    return onOk(source.value);
  } else {
    return onErr(source.value);
  }
}
