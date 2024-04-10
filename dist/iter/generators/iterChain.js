export function* iterChain(source, chainedItems) {
    for (const item of source) {
        yield item;
    }
    for (const item of chainedItems) {
        yield item;
    }
}
