export function take(source, takeAmount) {
    return source
        .enumerate()
        .takeWhile(({ index }) => index < takeAmount)
        .map(({ item }) => item);
}
