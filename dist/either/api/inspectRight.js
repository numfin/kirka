export function inspectRight(either, fn) {
    either.mapRight(fn);
    return either;
}
