import { iterEnumerate, iterFactory, iterSkipWhile, iterTakeWhile, } from "./gen";
import { None, OptionFrom, Some } from "../option";
export function create_iter(source) {
    /** `Generator<T>` with local state, used for `.next()` iteration */
    const inner = source();
    const api = {
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
})(IterApi || (IterApi = {}));
