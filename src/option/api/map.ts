import { Option, OptionUnion } from "../interfaces";
import { unionNone } from "./unionNone";
import { unionSome } from "./unionSome";
import { unwrap } from "./unwrap";

export function map<T, U>(option: Option<T>, fn: (value: T) => U) {
  const inner = option.inner();
  if (inner.type === "Some") {
    return unionSome(fn(unwrap(option)));
  }
  return unionNone<U>();
}
