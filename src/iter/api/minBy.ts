import { Iter } from "../interfaces";

export function minBy<T>(source: Iter<T>, fn: (item: T) => number) {
  let min = source.first();
  for (const item of source.skip(1)) {
    min = min
      .filter((minItem) => fn(item) < fn(minItem))
      .map(() => item)
      .or(min);
  }
  return min;
}
