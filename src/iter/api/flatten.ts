import { Iter } from "../interfaces.js";
import { toIterable } from "./toIterable.js";

export function flatten<T>(source: Iter<T>) {
  return source.map(toIterable).flatMap((v) => v);
}
