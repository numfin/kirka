import { createAggregator } from "../middleware/aggregate.js";
import { isSome } from "./is_some.js";

export function unwrapOr<T>(defaultValue: T) {
  return createAggregator<T, T>((_, inner) => {
    return isSome(inner) ? inner.value : defaultValue;
  });
}
