import { createAggregator } from "../middleware/aggregate.js";

export function groupBy<T, U>(keyExtractor: (item: T) => U) {
  return createAggregator<T, Map<U, T[]>>((_, source) => {
    const groups = new Map<U, T[]>();
    for (const item of source()) {
      const key = keyExtractor(item);
      const group = groups.get(key);
      if (Array.isArray(group)) {
        group.push(item);
      } else {
        groups.set(key, [item]);
      }
    }
    return groups;
  });
}
