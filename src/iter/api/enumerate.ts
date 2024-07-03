import { createRemapper } from "../middleware/remap.js";

export type WithIndex<T> = { item: T; index: number };

export function enumerate<T>() {
  return createRemapper<T, WithIndex<T>>(function* (_, source) {
    let index = 0;
    for (const item of source()) {
      yield { item, index };
      index += 1;
    }
  });
}
