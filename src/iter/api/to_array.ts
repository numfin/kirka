import { createAggregator } from "../middleware/aggregate.js";

export function toArray<T>() {
  return createAggregator<T, T[]>((_, source) => {
    return Array.from(source());
  });
}
