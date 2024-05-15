import { createAggregator } from "../middleware/aggregate.js";

export function forEach<T>(fn: (item: T) => void) {
  return createAggregator<T, undefined>((_, source) => {
    for (const item of source()) {
      fn(item);
    }
  });
}
