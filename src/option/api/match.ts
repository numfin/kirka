import { createAggregator } from "../middleware/aggregate.js";
import { isSome } from "./is_some.js";

export function match<T, U>(onSome: (v: T) => U, onNone: () => U) {
  return createAggregator<T, U>((_, inner) => {
    if (isSome(inner)) {
      return onSome(inner.value);
    }
    return onNone();
  });
}
