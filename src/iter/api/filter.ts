import { createRemapper } from "../middleware/remap.js";

export function filter<T>(fn: (item: T) => boolean) {
  return createRemapper<T, T>(function* (_, source) {
    for (const item of source()) {
      if (fn(item)) {
        yield item;
      }
    }
  });
}
