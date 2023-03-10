import { iterFactory, iterInfinite } from "./gen";
import { Iter } from "./interfaces";
import { createIter } from "./iter";

export namespace IterFrom {
  export function iterable<T>(source: Iterable<T>): Iter<T> {
    return createIter(() => iterFactory(source));
  }
  export function array<T>(source: T[]): Iter<T> {
    return iterable(source);
  }
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
}
