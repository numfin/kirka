export function or(result, otherResult) {
    return result.orElse(() => otherResult);
}
