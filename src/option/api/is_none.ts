import { None, OptionUnion } from "../base.js";

export function isNone<T>(inner: OptionUnion<T>): inner is None {
  return inner === None;
}
