import { None, OptionUnion, Some } from "../base.js";

export function isSome<T>(inner: OptionUnion<T>): inner is Some<T> {
  return inner !== None;
}
