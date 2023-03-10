export function minBy(source, fn) {
    let min = source.first();
    for (const item of source.skip(1)) {
        min = min
            .filter((minItem) => fn(item) < fn(minItem))
            .map(() => item)
            .or(min);
    }
    return min;
}
