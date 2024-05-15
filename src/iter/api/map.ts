import { createRemapper } from "../middleware/remap.js";

export function map<T, U>(fn: (item: T) => U) {
  return createRemapper<T, U>(function* (_, source) {
    for (const item of source()) {
      yield fn(item);
    }
  });
}
