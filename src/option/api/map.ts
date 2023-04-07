import { Option } from "../interfaces.js";
import { unionNone } from "./unionNone.js";
import { unionSome } from "./unionSome.js";
import { unwrap } from "./unwrap.js";

export function map<T, U>(option: Option<T>, fn: (value: T) => U) {
  const inner = option.inner();
  if (inner.type === "Some") {
    return unionSome(fn(unwrap(option)));
  }
  return unionNone<U>();
}
