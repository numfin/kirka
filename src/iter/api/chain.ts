import { createRemapper } from "../middleware/remap.js";

export function chain<T>(chain: Iterable<T>) {
  return createRemapper<T, T>(function* (_, source) {
    for (const item of source()) {
      yield item;
    }
    for (const item of chain) {
      yield item;
    }
  });
}
