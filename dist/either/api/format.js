export function format(either) {
    return `Either.${either.type}(${either.value})`;
}
