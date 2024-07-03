import { NewOption } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";

export function map<T, U>(fn: (value: T) => U) {
  return createRemapper<T, U>((_, inner) => {
    if (inner.type === "Some") {
      return NewOption.Some(fn(inner.value));
    }
    return NewOption.None<U>();
  });
}
