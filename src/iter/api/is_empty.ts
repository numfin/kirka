import { createAggregator } from "../middleware/aggregate.js";

export function isEmpty<T>() {
  return createAggregator<T, boolean>((_, source) => {
    for (const _ of source()) {
      return false;
    }
    return true;
  });
}
