export function flow(map) {
    const queue = [];
    const api = {
        clone() {
            return queue.reduce((acc, fn) => acc.map(fn), flow(map));
        },
        map(mapper) {
            queue.push(mapper);
            return api;
        },
        mapClone(mapper) {
            return api.clone().map(mapper);
        },
        chain(mapper) {
            queue.push((prev) => [prev, mapper(prev)]);
            return api;
        },
        build() {
            return (...args) => queue.reduce((prevResult, currentFn) => currentFn(prevResult), map(...args));
        },
    };
    return api;
}
