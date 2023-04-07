import { iterFlat } from "../generators/iterFlat.js";
import { Iter } from "../interfaces.js";

export function flatMap<T, U>(source: Iter<T>, fn: (item: T) => Iterable<U>) {
  return iterFlat(source.map(fn));
}
