export function unwrapLeft(either) {
    if (either.isRight()) {
        throw new Error(`unwrapLeft called on ${either.format()}`);
    }
    return either.unwrap();
}
