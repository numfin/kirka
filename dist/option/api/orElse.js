export function orElse(option, fn) {
    return option.isSome() ? option.inner() : fn().inner();
}
