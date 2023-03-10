export function inspectErr(result, fn) {
    result.mapErr(fn);
    return result;
}
