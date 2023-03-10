export function any(source, fn) {
    for (let item of source) {
        if (fn(item)) {
            return true;
        }
    }
    return false;
}
