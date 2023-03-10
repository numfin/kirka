export function unwrapErrOr(result, default_value) {
    return result.isErr() ? result.unwrapErr() : default_value;
}
