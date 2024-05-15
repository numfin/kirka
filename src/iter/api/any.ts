import { createAggregator } from "../middleware/aggregate.js";

export function any<T>(fn: (item: T) => boolean) {
  return createAggregator<T, boolean>((iter) => {
    return iter.do((_, source) => {
      for (const item of source()) {
        if (fn(item)) {
          return true;
        }
      }
      return false;
    });
  });
}
