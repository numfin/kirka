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
import { flatMap } from "./api/flatMap";
import { flatten } from "./api/flatten";
import { fold } from "./api/fold";
import { forEach } from "./api/forEach";
import { map } from "./api/map";
import { next } from "./api/next";
import { nth } from "./api/nth";
import { position } from "./api/position";
import { skip } from "./api/skip";
import { skipWhile } from "./api/skipWhile";
import { stepBy } from "./api/stepBy";
import { take } from "./api/take";
import { takeWhile } from "./api/takeWhile";
export function createIter(source) {
    /** `Generator<T>` with local state, used for `.next()` iteration */
    const inner = source();
    const api = {
        *[Symbol.iterator]() {
            for (const item of source()) {
                yield item;
            }
        },
        next: () => next(inner),
        recreate: () => createIter(source),
        collect: () => collect(source),
        map: (fn) => createIter(() => map(source, fn)),
        filter: (fn) => createIter(() => filter(source, fn)),
        filterMap: (fn) => filterMap(api, fn),
        enumerate: () => createIter(() => enumerate(source)),
        skipWhile: (fn) => createIter(() => skipWhile(source, fn)),
        skip: (i) => skip(api, i),
        takeWhile: (fn) => createIter(() => takeWhile(source, fn)),
        take: (i) => take(api, i),
        nth: (i) => nth(api, i),
        all: (fn) => all(source, fn),
        any: (fn) => any(source, fn),
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
    };
    return api;
}
