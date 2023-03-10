export function defaultMap<T, U>(item: T): U {
  return item as unknown as U;
}
