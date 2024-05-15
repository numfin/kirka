import { createAggregator } from "../middleware/aggregate.js";

export function toSet<T>() {
  return createAggregator<T, Set<T>>((_, source) => {
    return new Set(source());
  });
}
