export function isOkAnd(result, fn) {
    return result.isOk() && fn(result.unwrap());
}
