import { Iter } from "../interfaces";
import { iterFlat } from "../gen";

export function flatMap<T, U>(source: Iter<T>, fn: (item: T) => Iterable<U>) {
  return iterFlat(source.map(fn));
}
