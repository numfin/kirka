export * from "./interfaces.js";
export { IterFrom } from "./from/index.js";
import { all } from "./api/all.js";
import { any } from "./api/any.js";
import { collect } from "./api/collect.js";
import { cycle } from "./api/cycle.js";
import { enumerate } from "./api/enumerate.js";
import { eq } from "./api/eq.js";
import { filter } from "./api/filter.js";
import { filterMap } from "./api/filterMap.js";
import { find } from "./api/find.js";
import { findMap } from "./api/findMap.js";
import { first } from "./api/first.js";
import { flatMap } from "./api/flatMap.js";
import { flatten } from "./api/flatten.js";
import { fold } from "./api/fold.js";
import { forEach } from "./api/forEach.js";
import { get } from "./api/get.js";
import { intersperse } from "./api/intersperse.js";
import { isEmpty } from "./api/isEmpty.js";
import { last } from "./api/last.js";
import { len } from "./api/len.js";
import { map } from "./api/map.js";
import { maxBy } from "./api/maxBy.js";
import { minBy } from "./api/minBy.js";
import { next } from "./api/next.js";
import { nth } from "./api/nth.js";
import { partition } from "./api/partition.js";
import { position } from "./api/position.js";
import { reverse } from "./api/reverse.js";
import { skip } from "./api/skip.js";
import { skipWhile } from "./api/skipWhile.js";
import { stepBy } from "./api/stepBy.js";
import { take } from "./api/take.js";
import { takeWhile } from "./api/takeWhile.js";
export function createIter(source) {
    /** `Generator<T>` with local state, used for `.next()` iteration */
    const inner = source();
    const api = {
        *[Symbol.iterator]() {
            for (const item of source()) {
                yield item;
            }
        },
        intoIter: () => api.recreate(),
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
        stepBy: (amount) => stepBy(api, amount),
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
