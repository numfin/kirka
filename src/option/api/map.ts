import { OptionUnion } from "../interfaces";
import { NoneUnion } from "./NoneUnion";
import { SomeUnion } from "./SomeUnion";
import { unwrap } from "./unwrap";

export function map<T, U>(option: OptionUnion<T>, fn: (value: T) => U) {
  if (option.type === "Some") {
    return SomeUnion(fn(unwrap(option)));
  }
  return NoneUnion<U>();
}
