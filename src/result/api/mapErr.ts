import { Result, ResultUnion } from "../interfaces";
import { unionOk } from "./unionOk";
import { unionErr } from "./unionErr";

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
