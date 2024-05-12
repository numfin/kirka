import { createRemapper } from "../middleware/remap.js";

export function skip<T>(skipAmount: number) {
  return createRemapper<T, T>(function* (_, source) {
    let skipped = 0;
    const iter = source();
    while (skipped < skipAmount) {
      if (iter.next()) {
        skipped += 1;
      } else {
        return;
      }
    }
    for (const item of iter) {
      yield item;
    }
  });
}
