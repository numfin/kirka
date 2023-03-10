export function isEmpty(source) {
    for (const _ of source) {
        return false;
    }
    return true;
}
