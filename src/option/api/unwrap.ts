import { OptionUnion } from "../base.js";
import { isNone } from "./is_none.js";

export function unwrap<T>(inner: OptionUnion<T>) {
  if (isNone(inner)) {
    throw new Error(`unwrap called on None`);
  }
  return inner.value;
}
