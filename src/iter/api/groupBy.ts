export function groupBy<T, U>(source: Iterable<T>, fn: (item: T) => U) {
  const groups = new Map<U, T[]>();
  for (const item of source) {
    const key = fn(item);
    const group = groups.get(key);
    if (Array.isArray(group)) {
      group.push(item);
    } else {
      groups.set(key, [item]);
    }
  }
  return groups;
}
