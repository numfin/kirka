export function flatten(source) {
    if (source.isNone()) {
        return source;
    }
    const v = source.unwrap();
    try {
        if (v.isSome()) {
            return v;
        }
        return v;
    }
    catch (_) {
        return source;
    }
}
