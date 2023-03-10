export function unwrapErr(result) {
    if (result.isOk()) {
        throw new Error(`unwrapErr called on ${result.format()}`);
    }
    return result.inner().value;
}
