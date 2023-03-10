import { OptionUnion } from "../interfaces";
import { unionNone } from "./unionNone";
import { unionSome } from "./unionSome";
import { unwrap } from "./unwrap";

export function map<T, U>(option: OptionUnion<T>, fn: (value: T) => U) {
  if (option.type === "Some") {
    return unionSome(fn(unwrap(option)));
  }
  return unionNone<U>();
}
