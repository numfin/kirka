export function unwrapLeftOr(either, default_value) {
    return either.isLeft() ? either.unwrap() : default_value;
}
