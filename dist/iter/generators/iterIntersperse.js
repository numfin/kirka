export function* iterIntersperse(source, fn) {
    let alreadyRan = false;
    for (const item of source) {
        if (alreadyRan) {
            yield fn();
        }
        yield item;
        alreadyRan = true;
    }
}
