import { createAggregator } from "../middleware/aggregate.js";

export function toArray<T>() {
  return createAggregator<T, Array<T>>((_, source) => {
    return Array.from(source());
  });
}
