import { iterFlat } from "../generators/iterFlat";
import { Iter } from "../interfaces";

export function flatMap<T, U>(source: Iter<T>, fn: (item: T) => Iterable<U>) {
  return iterFlat(source.map(fn));
}
