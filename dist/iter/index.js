import { iterFactory } from "./gen";
function create_iter(source) {
    let inner = source;
    const api = {
        map: (fn) => IterApi.map(inner, fn),
        filter: (fn) => IterApi.filter(inner, fn),
        collect: () => IterApi.collect(inner),
    };
    return api;
}
export var IterApi;
(function (IterApi) {
    function fromArr(source) {
        return create_iter(iterFactory(source));
    }
    IterApi.fromArr = fromArr;
    function map(source, fn) {
        return create_iter(iterFactory(source, fn));
    }
    IterApi.map = map;
    function filter(source, fn) {
        return create_iter(iterFactory(source, (x) => x, fn));
    }
    IterApi.filter = filter;
    function collect(source) {
        return Array.from(source);
    }
    IterApi.collect = collect;
})(IterApi || (IterApi = {}));
