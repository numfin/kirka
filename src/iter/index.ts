export * from "./interfaces";
export { IterFrom } from "./from";

import { all } from "./api/all";
import { any } from "./api/any";
import { collect } from "./api/collect";
import { cycle } from "./api/cycle";
import { enumerate } from "./api/enumerate";
import { eq } from "./api/eq";
import { filter } from "./api/filter";
import { filterMap } from "./api/filterMap";
import { find } from "./api/find";
import { findMap } from "./api/findMap";
import { first } from "./api/first";
import { flatMap } from "./api/flatMap";
import { flatten } from "./api/flatten";
import { fold } from "./api/fold";
import { forEach } from "./api/forEach";
import { get } from "./api/get";
import { intersperse } from "./api/intersperse";
import { isEmpty } from "./api/isEmptry";
import { last } from "./api/last";
import { len } from "./api/len";
import { map } from "./api/map";
import { maxBy } from "./api/maxBy";
import { minBy } from "./api/minBy";
import { next } from "./api/next";
import { nth } from "./api/nth";
import { partition } from "./api/partition";
import { position } from "./api/position";
import { reverse } from "./api/reverse";
import { skip } from "./api/skip";
import { skipWhile } from "./api/skipWhile";
import { stepBy } from "./api/stepBy";
import { take } from "./api/take";
import { takeWhile } from "./api/takeWhile";
import type { ClonnableGenerator, Iter } from "./interfaces";

export function createIter<T>(source: ClonnableGenerator<T>) {
  /** `Generator<T>` with local state, used for `.next()` iteration */

  const inner = source();
  const api: Iter<T> = {
    *[Symbol.iterator]() {
      for (const item of source()) {
        yield item;
      }
    },
    next: () => next(inner),
    recreate: () => createIter(source),
    collect: () => collect(api),
    map: (fn) => createIter(() => map(api, fn)),
    filter: (fn) => createIter(() => filter(api, fn)),
    filterMap: (fn) => filterMap(api, fn),
    enumerate: () => createIter(() => enumerate(api)),
    skipWhile: (fn) => createIter(() => skipWhile(api, fn)),
    skip: (i) => skip(api, i),
    takeWhile: (fn) => createIter(() => takeWhile(api, fn)),
    take: (i) => take(api, i),
    nth: (amount) => nth(api, amount),
    all: (fn) => all(api, fn),
    any: (fn) => any(api, fn),
    cycle: () => createIter(() => cycle(source)),
    eq: (another, by) => eq(api, another, by),
    find: (fn) => find(api, fn),
    findMap: (fn) => findMap(api, fn),
    position: (fn) => position(api, fn),
    flatMap: (fn) => createIter(() => flatMap(api, fn)),
    flatten: () => flatten(api),
    fold: (startFrom, fn) => fold(api, startFrom, fn),
    stepBy: (amount: number) => stepBy(api, amount),
    forEach: (fn) => forEach(api, fn),
    intersperse: (value) => createIter(() => intersperse(api, value)),
    isEmpty: () => isEmpty(api),
    len: () => len(api),
    first: () => first(api),
    last: () => last(api),
    minBy: (fn) => minBy(api, fn),
    maxBy: (fn) => maxBy(api, fn),
    partition: (fn) => partition(api, fn),
    reverse: () => reverse(api),
    get: (pos) => get(api, pos),
  };
  return api;
}
