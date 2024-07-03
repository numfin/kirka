export function createRemapper(fn) {
    return (option, inner) => fn(option, inner);
}
