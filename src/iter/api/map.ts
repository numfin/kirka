import { iterFactory } from "../generators/iterFactory";

export function map<T, U>(source: Iterable<T>, fn: (item: T) => U) {
  return iterFactory(source, fn);
}
