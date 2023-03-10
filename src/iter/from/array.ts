import { Iter } from "../interfaces";
import { iterable } from "./iterable";

export function array<T>(source: T[]): Iter<T> {
  return iterable(source);
}
