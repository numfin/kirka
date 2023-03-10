export function andLeft(either, other_either) {
    return either.andThenLeft(() => other_either);
}
