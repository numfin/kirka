import { createRemapper } from "../middleware/remap.js";

export function take<T>(takeAmount: number) {
  return createRemapper<T, T>(function* (_, source) {
    let i = 0;
    for (const item of source()) {
      if (i++ < takeAmount) {
        yield item;
      } else {
        return;
      }
    }
  });
}
