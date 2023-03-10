export function format(option) {
    return option.type === "Some" ? `Some(${option.value})` : `None`;
}
