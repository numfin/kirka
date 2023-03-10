export function and(result, otherResult) {
    return result.andThen(() => otherResult);
}
