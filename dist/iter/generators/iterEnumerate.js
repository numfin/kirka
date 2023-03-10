export function* iterEnumerate(source) {
    let index = 0;
    for (const item of source) {
        yield { item, index };
        index += 1;
    }
}
