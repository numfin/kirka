import { enumerate } from "./api/enumerate.js";
import { IterPipe } from "./middleware/middleware.js";
import { map } from "./api/map.js";
import { next } from "./api/next.js";
import { take } from "./api/take.js";
import type { ClonnableGenerator } from "./interfaces.js";

export class Iter<T> {
  private inner: Generator<T, any, unknown>;
  [Symbol.iterator]() {
    return this.inner;
  }
  constructor(public source: ClonnableGenerator<T>) {
    this.inner = source();
  }
  static infinite() {
    return new Iter(function* () {
      while (true) yield;
    });
  }
  static from<T>(source: Iterable<T>) {
    return new Iter(function* () {
      for (const item of source) {
        yield item;
      }
    });
  }
  static fromRange(from: number, to: number, inclusive = false) {
    if (from > to) {
      throw new Error(`Invalid range: From(${from}) > To(${to})`);
    }
    const extra = inclusive ? 1 : 0;
    return Iter.infinite()
      .do(take(to - from + extra))
      .do(enumerate())
      .do(map(({ index }) => index + from));
  }

  clone() {
    return new Iter(this.source);
  }
  next() {
    return next(this.inner);
  }
  do<Out>(fn: IterPipe<T, Out>) {
    return fn(this, this.source, this.inner);
  }
  pipe<Args extends unknown[], Out>(fn: (...args: Args) => IterPipe<T, Out>) {
    return (...args: Args) => fn(...args)(this, this.source, this.inner);
  }
}
