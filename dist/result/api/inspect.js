export function inspect(result, fn) {
    result.map(fn);
    return result;
}
