import { createAggregator } from "../middleware/aggregate.js";

export function all<T>(fn: (item: T) => boolean) {
  return createAggregator<T, boolean>((iter) => {
    return iter.do((_, source) => {
      for (const item of source()) {
        if (!fn(item)) {
          return false;
        }
      }
      return true;
    });
  });
}
