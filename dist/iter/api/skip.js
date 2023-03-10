export function skip(source, skipAmount) {
    return source
        .enumerate()
        .skipWhile(({ index }) => index < skipAmount)
        .map(({ item }) => item);
}
