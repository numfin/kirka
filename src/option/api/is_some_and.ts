import { createAggregator } from "../middleware/aggregate.js";
import { isSome } from "./is_some.js";

export function isSomeAnd<T>(fn: (value: T) => boolean) {
  return createAggregator<T, boolean>((_, inner) => {
    return isSome(inner) && fn(inner.value);
  });
}
