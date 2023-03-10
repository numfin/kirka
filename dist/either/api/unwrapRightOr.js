export function unwrapRightOr(either, default_value) {
    return either.isRight() ? either.unwrap() : default_value;
}
