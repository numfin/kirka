import { Iter } from "../interfaces";
import { IterFrom } from "../from";

export function eq<T, U>(
  source: Iter<T>,
  another: Iterable<T>,
  by?: (item: T) => U
) {
  const sourceIter = source.recreate();
  const anotherIter = IterFrom.iterable(another);
  while (true) {
    const sourceNext = sourceIter.next();
    const anotherNext = anotherIter.next();
    if (sourceNext.isSome() || anotherNext.isSome()) {
      if (!sourceNext.eq(anotherNext, by)) {
        return false;
      }
    } else {
      return true;
    }
  }
}
