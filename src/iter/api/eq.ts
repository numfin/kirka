import { createAggregator } from "../middleware/aggregate.js";
import { Iter } from "../index.js";

export function eq<T, U>(another: Iterable<T>, by?: (item: T) => U) {
  return createAggregator<T, boolean>((iter) => {
    const sourceIter = iter.clone();
    const anotherIter = Iter.from(another);

    let sourceNext = sourceIter.next();
    let anotherNext = anotherIter.next();

    while (sourceNext.isSome() || anotherNext.isSome()) {
      if (!sourceNext.eq(anotherNext, by)) {
        return false;
      }
      sourceNext = sourceIter.next();
      anotherNext = anotherIter.next();
    }
    return true;
  });
}
