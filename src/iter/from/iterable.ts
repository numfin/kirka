import { createIter } from "../index.js";
import { iterFactory } from "../generators/iterFactory.js";
import { Iter } from "../interfaces.js";

export function iterable<T>(source: Iterable<T>): Iter<T> {
  return createIter(() => iterFactory(source));
}
