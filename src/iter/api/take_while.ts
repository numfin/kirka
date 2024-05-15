import { createRemapper } from "../middleware/remap.js";

export function takeWhile<T>(condition: (item: T) => boolean) {
  return createRemapper<T, T>(function* (_, source) {
    for (const item of source()) {
      if (condition(item)) {
        yield item;
      } else {
        return;
      }
    }
  });
}
