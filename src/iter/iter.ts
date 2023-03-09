import { ClonnableGenerator, Iter } from "./interfaces";
import {
  iterEnumerate,
  iterFactory,
  iterSkipWhile,
  iterTakeWhile,
} from "./gen";
import { None, Option, OptionFrom, Some } from "../option";

export function create_iter<T>(source: ClonnableGenerator<T>) {
  /** `Generator<T>` with local state, used for `.next()` iteration */
  const inner = source();
  const api: Iter<T> = {
    next: () => IterApi.next(inner),
    collect: () => IterApi.collect(source),
    map: (fn) => IterApi.map(source, fn),
    filter: (fn) => IterApi.filter(source, fn),
    filterMap: (fn) => IterApi.filterMap(api, fn),
    enumerate: () => IterApi.enumerate(source),
    skipWhile: (fn) => IterApi.skipWhile(source, fn),
    skip: (i) => IterApi.skip(api, i),
    takeWhile: (fn) => IterApi.takeWhile(source, fn),
    take: (i) => IterApi.take(api, i),
    nth: (i) => IterApi.nth(api, i),
    all: (fn) => IterApi.all(source, fn),
    any: (fn) => IterApi.any(source, fn),
  };
  return api;
}

export namespace IterApi {
  export function collect<T>(source: ClonnableGenerator<T>) {
    return Array.from(source());
  }
  export function map<T, U>(source: ClonnableGenerator<T>, fn: (item: T) => U) {
    return create_iter(() => iterFactory(source(), fn));
  }
  export function filter<T>(
    source: ClonnableGenerator<T>,
    fn: (item: T) => boolean
  ) {
    return create_iter(() => iterFactory(source(), (x) => x, fn));
  }
  export function filterMap<T, U>(source: Iter<T>, fn: (item: T) => Option<U>) {
    return source
      .map(fn)
      .filter((v) => v.isSome())
      .map((v) => v.unwrap());
  }
  export function enumerate<T>(source: ClonnableGenerator<T>) {
    return create_iter(() => iterEnumerate(source()));
  }
  export function skipWhile<T>(
    source: ClonnableGenerator<T>,
    fn: (item: T) => boolean
  ) {
    return create_iter(() => iterSkipWhile(source(), fn));
  }
  export function skip<T>(source: Iter<T>, skipAmount: number) {
    return source
      .enumerate()
      .skipWhile(({ index }) => index < skipAmount)
      .map(({ item }) => item);
  }
  export function takeWhile<T>(
    source: ClonnableGenerator<T>,
    fn: (item: T) => boolean
  ) {
    return create_iter(() => iterTakeWhile(source(), fn));
  }
  export function take<T>(source: Iter<T>, takeAmount: number) {
    return source
      .enumerate()
      .takeWhile(({ index }) => index < takeAmount)
      .map(({ item }) => item);
  }
  export function nth<T>(source: Iter<T>, index: number) {
    return OptionFrom.nullable(source.skip(index).take(1).collect()[0]);
  }
  export function all<T>(
    source: ClonnableGenerator<T>,
    fn: (item: T) => boolean
  ) {
    for (let item of source()) {
      if (!fn(item)) {
        return false;
      }
    }
    return true;
  }
  export function any<T>(
    source: ClonnableGenerator<T>,
    fn: (item: T) => boolean
  ) {
    for (let item of source()) {
      if (fn(item)) {
        return true;
      }
    }
    return false;
  }
  export function next<T>(generator: Generator<T>): Option<T> {
    const current = generator.next();
    return current.done ? None() : Some(current.value);
  }
}
