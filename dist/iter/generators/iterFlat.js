export function* iterFlat(source) {
    for (const item of source) {
        for (const subItem of item) {
            yield subItem;
        }
    }
}
