export function unwrapOr(option, default_value) {
    return option.type === "None" ? default_value : option.value;
}
