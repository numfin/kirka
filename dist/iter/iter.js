import { iterEnumerate, iterFactory, iterSkipWhile, iterTakeWhile, } from "./gen";
export function create_iter(source) {
    const api = {
        collect: () => IterApi.collect(source),
        map: (fn) => IterApi.map(source, fn),
        filter: (fn) => IterApi.filter(source, fn),
        enumerate: () => IterApi.enumerate(source),
        skipWhile: (fn) => IterApi.skipWhile(source, fn),
        skip: (i) => IterApi.skip(api, i),
        takeWhile: (fn) => IterApi.takeWhile(source, fn),
        take: (i) => IterApi.take(api, i),
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
})(IterApi || (IterApi = {}));
