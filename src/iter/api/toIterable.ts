export function toIterable<T>(source: T): Iterable<FlatArray<T, 1>> {
  if (source && typeof source === "object" && Symbol.iterator in source) {
    return source as Iterable<FlatArray<T, 1>>;
  }
  return [source] as FlatArray<T, 1>[];
}
