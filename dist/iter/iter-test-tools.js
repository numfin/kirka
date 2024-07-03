export function nativeRange(from, to, inclusive = false) {
    if (from > to) {
        throw new Error(`Invalid Range: From(${from}) > To(${to})`);
    }
    return Array.from({ length: inclusive ? to - from + 1 : to - from }, (_, i) => i + from);
}
