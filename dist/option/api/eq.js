export function eq(option, value, by = (x) => x) {
    if (value.isNone() || option.isNone()) {
        return value.isNone() && option.isNone();
    }
    return by(value.unwrap()) === by(option.unwrap());
}
