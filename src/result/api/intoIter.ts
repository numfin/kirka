import { Iter, IterFrom } from "../../index.js";
import { ResultUnion } from "../interfaces.js";
import { isOk } from "./isOk.js";

export function intoIter<T, E>(result: ResultUnion<T, E>): Iter<T> {
  if (isOk(result)) {
    return IterFrom.array([result.value]);
  }
  return IterFrom.array([]);
}
