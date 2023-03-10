export function inspectLeft(either, fn) {
    either.mapLeft(fn);
    return either;
}
