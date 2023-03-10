import { Iter } from "../interfaces";

export function maxBy<T>(source: Iter<T>, fn: (item: T) => number) {
  let max = source.first();
  for (const item of source.skip(1)) {
    max = max
      .filter((minItem) => fn(item) > fn(minItem))
      .map(() => item)
      .or(max);
  }
  return max;
}
