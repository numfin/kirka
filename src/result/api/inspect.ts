import { createRemapper } from "../middleware/remap.js";
import { isOk } from "./isOk.js";

export function inspect<T, E>(fn: (value: T) => void) {
  return createRemapper<T, E, T, E>((result, inner) => {
    if (isOk(inner)) {
      fn(inner.value);
    }
    return result;
  });
}
