import { createRemapper } from "../middleware/remap.js";
import { isErr } from "./isErr.js";

export function inspectErr<T, E>(fn: (value: E) => void) {
  return createRemapper<T, E, T, E>((result, inner) => {
    if (isErr(inner)) {
      fn(inner.err);
    }
    return result;
  });
}
