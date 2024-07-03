import { createAggregator } from "../middleware/aggregate.js";
import { isOk } from "./isOk.js";

export function match<T, E, U>(onOk: (v: T) => U, onErr: (e: E) => U) {
  return createAggregator<T, E, U>((_, inner) => {
    if (isOk(inner)) {
      return onOk(inner.value);
    }
    return onErr(inner.err);
  });
}
