import { Iter } from "./interfaces";
import { iterFactory } from "./gen";

function create_iter<T>(source: Generator<T>) {
  let inner = source;
  const api: Iter<T> = {
    map: (fn) => IterApi.map(inner, fn),
    filter: (fn) => IterApi.filter(inner, fn),
    collect: () => IterApi.collect(inner),
  };
  return api;
}

export namespace IterApi {
  export function fromArr<T>(source: T[]): Iter<T> {
    return create_iter(iterFactory(source));
  }
  export function map<T, U>(source: Generator<T>, fn: (item: T) => U) {
    return create_iter(iterFactory(source, fn));
  }
  export function filter<T>(source: Generator<T>, fn: (item: T) => boolean) {
    return create_iter(iterFactory(source, (x) => x, fn));
  }
  export function collect<T>(source: Generator<T>) {
    return Array.from(source);
  }
}
