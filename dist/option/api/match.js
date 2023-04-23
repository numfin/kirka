export function match(source, onSome, onNone) {
    return source.map(onSome).unwrapOrElse(onNone);
}
