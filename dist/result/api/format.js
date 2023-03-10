export function format(result, formatter) {
    const inner = result.inner();
    return `Result.${inner.type}(${formatter?.(result) ?? inner.value})`;
}
