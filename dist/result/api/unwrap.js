export function unwrap(result) {
    const inner = result.inner();
    if (result.isErr()) {
        throw new Error(`unwrap() on ${result.format()}`);
    }
    return inner.value;
}
