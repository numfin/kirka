import { iterFactory, iterInfinite } from "./gen";
import { Iter } from "./interfaces";
import { create_iter } from "./iter";

export namespace IterFrom {
  export function array<T>(source: T[]): Iter<T> {
    return create_iter(() => iterFactory(source));
  }
  export function range(from: number, to: number, inclusive = false) {
    if (from > to) {
      throw new Error(`Invalid range: From(${from}) > To(${to})`);
    }
    const extra = inclusive ? 1 : 0;
    return create_iter(() => iterInfinite())
      .take(to - from + extra)
      .enumerate()
      .map(({ index }) => index + from);
  }
}
