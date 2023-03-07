export interface Iter<T> {
  map<U>(fn: (item: T) => U): Iter<U>;
  filter(fn: (item: T) => boolean): Iter<T>;
}
