export function andRight(either, other_either) {
    return either.andThenRight(() => other_either);
}
