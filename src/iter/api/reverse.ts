import { IterFrom } from "../from";

export function reverse<T>(source: Iterable<T>) {
  return IterFrom.array(Array.from(source).reverse());
}
