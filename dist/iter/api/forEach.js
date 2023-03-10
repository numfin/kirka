export function forEach(source, fn) {
    for (const item of source) {
        fn(item);
    }
}
