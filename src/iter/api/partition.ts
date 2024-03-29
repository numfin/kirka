import { IterFrom } from "../from/index.js";
import { Iter } from "../interfaces.js";

export function partition<T>(
  source: Iterable<T>,
  fn: (item: T) => boolean
): [Iter<T>, Iter<T>] {
  const iterA = [];
  const iterB = [];
  for (const item of source) {
    if (fn(item)) {
      iterA.push(item);
    } else {
      iterB.push(item);
    }
  }
  return [IterFrom.array(iterA), IterFrom.array(iterB)];
}
