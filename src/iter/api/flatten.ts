import { Iter } from "../interfaces";
import { toIterable } from "./toIterable";

export function flatten<T>(source: Iter<T>) {
  return source.map(toIterable).flatMap((v) => v);
}
