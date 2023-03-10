export function maxBy(source, fn) {
    let max = source.first();
    for (const item of source.skip(1)) {
        max = max
            .filter((minItem) => fn(item) > fn(minItem))
            .map(() => item)
            .or(max);
    }
    return max;
}
