import { Iter } from "../interfaces.js";
import { iterable } from "./iterable.js";

export function array<T>(source: T[]): Iter<T> {
  return iterable(source);
}
