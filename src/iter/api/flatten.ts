import { flatMap } from "./flat_map.js";

export function flatten<T>() {
  return flatMap<Iterable<T>, T>((v) => v);
}
