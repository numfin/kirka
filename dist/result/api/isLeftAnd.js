export function isLeftAnd(either, fn) {
    return either.isLeft() && fn(either.unwrap());
}
