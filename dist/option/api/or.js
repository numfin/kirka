export function or(current_value, new_value) {
    return current_value.isSome() ? current_value.inner() : new_value.inner();
}
