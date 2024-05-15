import { createAggregator } from "../middleware/aggregate.js";

export function partitionBy<T>(fn: (item: T) => boolean) {
  return createAggregator<T, [T[], T[]]>((_, source) => {
    const collectionA = [];
    const collectionB = [];

    for (const item of source()) {
      if (fn(item)) {
        collectionA.push(item);
      } else {
        collectionB.push(item);
      }
    }
    return [collectionA, collectionB];
  });
}
