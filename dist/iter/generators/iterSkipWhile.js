export function* iterSkipWhile(source, filter) {
    let flag = false;
    for (let item of source) {
        if (flag || !filter(item)) {
            flag = true;
            yield item;
        }
    }
}
