export function flow(map) {
    const queue = [];
    const api = {
        map(mapper) {
            queue.push(mapper);
            return api;
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
export function pipe(value) {
    const queue = [];
    const api = {
        map(mapper) {
            queue.push(mapper);
            return api;
        },
        chain(mapper) {
            queue.push((prev) => [prev, mapper(prev)]);
            return api;
        },
        build() {
            return (...args) => queue.reduce((prevResult, currentFn) => currentFn(prevResult), value);
        },
    };
    return api;
}
