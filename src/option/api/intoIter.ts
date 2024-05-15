import { Iter } from "../../index.js";
import { OptionUnion } from "../interfaces.js";
import { isSome } from "./isSome.js";

export function intoIter<T>(option: OptionUnion<T>): Iter<T> {
  if (isSome(option)) {
    return Iter.from([option.value]);
  }
  return Iter.from([]);
}
