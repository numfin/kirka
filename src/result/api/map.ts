import { ResultUnion } from "../interfaces.js";
import { unionOk } from "./unionOk.js";
import { unionErr } from "./unionErr.js";

export function map<T, E, U>(result: ResultUnion<T, E>, fn: (value: T) => U) {
  if (result.type === "Ok") {
    return unionOk(fn(result.value));
  } else {
    return unionErr(result.value);
  }
}
