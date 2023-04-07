import { IterFrom } from "../from/index.js";

export function reverse<T>(source: Iterable<T>) {
  return IterFrom.array(Array.from(source).reverse());
}
