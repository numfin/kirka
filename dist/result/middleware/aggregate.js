export function createAggregator(fn) {
    return (option, inner) => fn(option, inner);
}
