import { createRemapper } from "../middleware/remap.js";

export function skipWhile<T>(filter: (item: T) => boolean) {
  return createRemapper<T, T>(function* (_, source) {
    let flag = false;
    for (const item of source()) {
      if (flag || !filter(item)) {
        flag = true;
        yield item;
      }
    }
  });
}
