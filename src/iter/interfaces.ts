export type WithIndex<T> = { item: T; index: number };

export interface Iter<T> {
  collect(): T[];
  map<U>(fn: (item: T) => U): Iter<U>;
  filter(fn: (item: T) => boolean): Iter<T>;
  enumerate(): Iter<WithIndex<T>>;
  skipWhile(fn: (item: T) => boolean): Iter<T>;
  skip(i: number): Iter<T>;
  takeWhile(fn: (item: T) => boolean): Iter<T>;
  take(i: number): Iter<T>;
}

export type ClonnableGenerator<T> = () => Generator<T>;
