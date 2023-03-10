export function isSomeAnd(option, fn) {
    return option.isSome() && fn(option.unwrap());
}
