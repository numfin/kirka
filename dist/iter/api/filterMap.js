export function filterMap(source, fn) {
    return source
        .map(fn)
        .filter((v) => v.isSome())
        .map((v) => v.unwrap());
}
