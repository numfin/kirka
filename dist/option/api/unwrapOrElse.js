export function unwrapOrElse(option, default_fn) {
    return option.type === "None" ? default_fn() : option.value;
}
