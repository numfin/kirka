import { iterFactory } from "../generators/iterFactory.js";

export function map<T, U>(source: Iterable<T>, fn: (item: T) => U) {
  return iterFactory(source, fn);
}
