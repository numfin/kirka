export function isErrAnd(result, fn) {
    return result.isErr() && fn(result.unwrapErr());
}
