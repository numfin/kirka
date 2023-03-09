import { iterCycle, iterEnumerate, iterFactory, iterFlat, iterSkipWhile, iterTakeWhile, } from "./gen";
import { None, OptionFrom, Some } from "../option";
import { IterFrom } from "./from";
export function create_iter(source) {
    /** `Generator<T>` with local state, used for `.next()` iteration */
    const inner = source();
    const api = {
        *[Symbol.iterator]() {
            for (const item of source()) {
                yield item;
            }
        },
        next: () => IterApi.next(inner),
        recreate: () => create_iter(source),
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
        cycle: () => IterApi.cycle(source),
        eq: (another, by) => IterApi.eq(api, another, by),
        find: (fn) => IterApi.find(api, fn),
        findMap: (fn) => IterApi.findMap(api, fn),
        position: (fn) => IterApi.position(api, fn),
        flatMap: (fn) => IterApi.flatMap(api, fn),
        flatten: () => IterApi.flatten(api),
        fold: (startFrom, fn) => IterApi.fold(api, startFrom, fn),
        stepBy: (amount) => IterApi.stepBy(api, amount),
        forEach: (fn) => IterApi.forEach(api, fn),
    };
    return api;
}
export var IterApi;
(function (IterApi) {
    function collect(source) {
        return Array.from(source());
    }
    IterApi.collect = collect;
    function map(source, fn) {
        return create_iter(() => iterFactory(source(), fn));
    }
    IterApi.map = map;
    function filter(source, fn) {
        return create_iter(() => iterFactory(source(), (x) => x, fn));
    }
    IterApi.filter = filter;
    function filterMap(source, fn) {
        return source
            .map(fn)
            .filter((v) => v.isSome())
            .map((v) => v.unwrap());
    }
    IterApi.filterMap = filterMap;
    function enumerate(source) {
        return create_iter(() => iterEnumerate(source()));
    }
    IterApi.enumerate = enumerate;
    function skipWhile(source, fn) {
        return create_iter(() => iterSkipWhile(source(), fn));
    }
    IterApi.skipWhile = skipWhile;
    function skip(source, skipAmount) {
        return source
            .enumerate()
            .skipWhile(({ index }) => index < skipAmount)
            .map(({ item }) => item);
    }
    IterApi.skip = skip;
    function takeWhile(source, fn) {
        return create_iter(() => iterTakeWhile(source(), fn));
    }
    IterApi.takeWhile = takeWhile;
    function take(source, takeAmount) {
        return source
            .enumerate()
            .takeWhile(({ index }) => index < takeAmount)
            .map(({ item }) => item);
    }
    IterApi.take = take;
    function nth(source, index) {
        return OptionFrom.nullable(source.skip(index).take(1).collect()[0]);
    }
    IterApi.nth = nth;
    function all(source, fn) {
        for (let item of source()) {
            if (!fn(item)) {
                return false;
            }
        }
        return true;
    }
    IterApi.all = all;
    function any(source, fn) {
        for (let item of source()) {
            if (fn(item)) {
                return true;
            }
        }
        return false;
    }
    IterApi.any = any;
    function next(generator) {
        const current = generator.next();
        return current.done ? None() : Some(current.value);
    }
    IterApi.next = next;
    function cycle(source) {
        return create_iter(() => iterCycle(source));
    }
    IterApi.cycle = cycle;
    function eq(source, another, by) {
        const sourceIter = source.recreate();
        const anotherIter = IterFrom.iterable(another);
        while (true) {
            const sourceNext = sourceIter.next();
            const anotherNext = anotherIter.next();
            if (sourceNext.isSome() || anotherNext.isSome()) {
                if (!sourceNext.eq(anotherNext, by)) {
                    return false;
                }
            }
            else {
                return true;
            }
        }
    }
    IterApi.eq = eq;
    function find(source, fn) {
        const result = source
            .skipWhile((item) => !fn(item))
            .take(1)
            .collect();
        return result.length > 0 ? Some(result[0]) : None();
    }
    IterApi.find = find;
    function findMap(source, fn) {
        const result = source
            .map(fn)
            .skipWhile((v) => v.isNone())
            .take(1)
            .collect();
        return result.length > 0 ? result[0] : None();
    }
    IterApi.findMap = findMap;
    function position(source, fn) {
        return source
            .enumerate()
            .find(({ item }) => fn(item))
            .map(({ index }) => index);
    }
    IterApi.position = position;
    function flatMap(source, fn) {
        return create_iter(() => iterFlat(source.map(fn)));
    }
    IterApi.flatMap = flatMap;
    function flatten(source) {
        return source.map(toIterable).flatMap((v) => v);
    }
    IterApi.flatten = flatten;
    function toIterable(source) {
        if (source && typeof source === "object" && Symbol.iterator in source) {
            return source;
        }
        return [source];
    }
    IterApi.toIterable = toIterable;
    function fold(source, startFrom, fn) {
        let lastAcc = startFrom;
        for (const item of source) {
            lastAcc = fn(lastAcc, item);
        }
        return lastAcc;
    }
    IterApi.fold = fold;
    function stepBy(source, amount) {
        if (amount <= 0) {
            throw new Error(`.stepBy() amount should be > 0`);
        }
        return source
            .enumerate()
            .filter(({ index }) => index === 0 || index % amount === 0)
            .map(({ item }) => item);
    }
    IterApi.stepBy = stepBy;
    function forEach(source, fn) {
        for (const item of source) {
            fn(item);
        }
    }
    IterApi.forEach = forEach;
})(IterApi || (IterApi = {}));
