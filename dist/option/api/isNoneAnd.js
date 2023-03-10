export function isNoneAnd(option, fn) {
    return option.isNone() && fn();
}
