export function unwrapRight(either) {
    if (either.isLeft()) {
        throw new Error(`unwrapRight called on ${either.format()}`);
    }
    return either.unwrap();
}
