export function uwnrapOr(result, default_value) {
    return result.isOk() ? result.unwrap() : default_value;
}
