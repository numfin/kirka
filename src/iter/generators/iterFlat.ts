export function* iterFlat<T>(source: Iterable<Iterable<T>>) {
  for (const item of source) {
    for (const subItem of item) {
      yield subItem;
    }
  }
}
