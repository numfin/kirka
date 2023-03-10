export function all(source, fn) {
    for (let item of source()) {
        if (!fn(item)) {
            return false;
        }
    }
    return true;
}
