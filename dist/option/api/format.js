export function format(option, fn) {
    const inner = option.inner();
    return inner.type === "Some"
        ? `Some(${fn?.(option) ?? inner.value})`
        : `None`;
}
