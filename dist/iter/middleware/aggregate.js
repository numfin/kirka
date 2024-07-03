export function createAggregator(fn) {
    return (iter, source, inner) => fn(iter, source, inner);
}
