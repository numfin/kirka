import { ResultUnion } from "../interfaces.js";
import { unionOk } from "./unionOk.js";
import { unionErr } from "./unionErr.js";

export function mapErr<T, E, U>(
  result: ResultUnion<T, E>,
  fn: (value: E) => U
) {
  if (result.type === "Err") {
    return unionErr(fn(result.value));
  } else {
    return unionOk(result.value);
  }
}
