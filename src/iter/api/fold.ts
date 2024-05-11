import { createAggregator } from "../middleware/aggregate.js";

export function fold<T, U>(startFrom: U, fn: (endWith: U, item: T) => U) {
  return createAggregator<T, U>((_, source) => {
    let lastValue = startFrom;
    for (const item of source()) {
      lastValue = fn(lastValue, item);
    }
    return lastValue;
  });
}
