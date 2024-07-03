import { createAggregator } from "../middleware/aggregate.js";
import { isOk } from "./isOk.js";

export function isOkAnd<T>(fn: (v: T) => boolean) {
  return createAggregator<T, unknown, boolean>((_, inner) => {
    return isOk(inner) && fn(inner.value);
  });
}
