import { Iter } from "../index.js";
import { createAggregator } from "../middleware/aggregate.js";

export function reverse<T>() {
  return createAggregator<T, Iter<T>>((_, source) => {
    return Iter.from(Array.from(source()).reverse());
  });
}
