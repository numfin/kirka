export function* iterTakeWhile(source, filter) {
    for (let item of source) {
        if (filter(item)) {
            yield item;
        }
        else {
            return;
        }
    }
}
