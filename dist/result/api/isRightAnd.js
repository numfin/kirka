export function isRightAnd(either, fn) {
    return either.isRight() && fn(either.unwrap());
}
