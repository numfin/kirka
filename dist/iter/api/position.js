export function position(source, fn) {
    return source
        .enumerate()
        .find(({ item }) => fn(item))
        .map(({ index }) => index);
}
