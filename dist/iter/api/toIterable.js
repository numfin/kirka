export function toIterable(source) {
    if (source && typeof source === "object" && Symbol.iterator in source) {
        return source;
    }
    return [source];
}
