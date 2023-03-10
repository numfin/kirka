import { createIter } from "..";
import { iterFactory } from "../generators/iterFactory";
import { Iter } from "../interfaces";

export function iterable<T>(source: Iterable<T>): Iter<T> {
  return createIter(() => iterFactory(source));
}
