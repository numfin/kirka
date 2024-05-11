import { createRemapper } from "../middleware/remap.js";

export function cycle<T>() {
  return createRemapper<T, T>(function* (_, source) {
    let iter = source();
    let firstValue = iter.next();

    if (firstValue.done) return;
    yield firstValue.value;

    while (true) {
      let nextValue = iter.next();
      if (nextValue.done) {
        iter = source();
      } else {
        yield nextValue.value;
      }
    }
  });
}
