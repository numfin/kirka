import { iterFactory } from "../generators/iterFactory";

export function filter<T>(source: Iterable<T>, fn: (item: T) => boolean) {
  return iterFactory(source, (x) => x, fn);
}
