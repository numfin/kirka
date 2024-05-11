import { createRemapper } from "../middleware/remap.js";

export function flatMap<T, U>(fn: (item: T) => Iterable<U>) {
  return createRemapper<T, U>(function* (_, source) {
    for (const item of source()) {
      for (const subItem of fn(item)) {
        yield subItem;
      }
    }
  });
}
