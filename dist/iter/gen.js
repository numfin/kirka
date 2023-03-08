export const defaultFilter = (item) => true;
export const defaultMap = (item) => item;
export function* iterFactory(source, map = (defaultMap), filter = (defaultFilter)) {
    const check = (item) => filter(item);
    for (const item of source) {
        const mappedItem = map(item);
        if (check(mappedItem)) {
            yield mappedItem;
        }
    }
}
export function* iterInfinite() {
    while (true) {
        yield;
    }
}
export function* iterEnumerate(source) {
    let index = 0;
    for (const item of source) {
        yield { item, index };
        index += 1;
    }
}
export function* iterSkipWhile(source, filter) {
    let flag = false;
    for (let item of source) {
        if (flag || !filter(item)) {
            flag = true;
            yield item;
        }
    }
}
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
