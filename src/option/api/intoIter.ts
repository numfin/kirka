import { Iter } from "../../index.js";
import { OptionUnion } from "../base.js";
import { isSome } from "./is_some.js";

export function intoIter<T>(option: OptionUnion<T>): Iter<T> {
  if (isSome(option)) {
    return Iter.from([option.value]);
  }
  return Iter.from([]);
}
