import { createIter } from "../index.js";
import { iterInfinite } from "../generators/iterInfinite.js";

export function range(from: number, to: number, inclusive = false) {
  if (from > to) {
    throw new Error(`Invalid range: From(${from}) > To(${to})`);
  }
  const extra = inclusive ? 1 : 0;
  return createIter(() => iterInfinite())
    .take(to - from + extra)
    .enumerate()
    .map(({ index }) => index + from);
}
