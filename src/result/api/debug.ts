import { ResultUnion } from "../base.js";
import { isOk } from "./isOk.js";

export function debug<T, E>(
  inner: ResultUnion<T, E>,
  { ok = (v) => v, err = (e) => e } = {} as {
    ok?(v: T): string;
    err?(e: E): string;
  }
) {
  return `Result.${inner.type}(${
    isOk(inner) ? ok(inner.value) : err(inner.err)
  })`;
}
