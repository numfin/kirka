import { ResultUnion } from "../interfaces";
import { unionOk } from "./unionOk";
import { unionErr } from "./unionErr";

export function map<T, E, U>(result: ResultUnion<T, E>, fn: (value: T) => U) {
  if (result.type === "Ok") {
    return unionOk(fn(result.value));
  } else {
    return unionErr(result.value);
  }
}
