import { None, Option, Some } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";

export function first<T>() {
  return createAggregator<T, Option<T>>((_, source) => {
    for (const item of source()) {
      return Some(item);
    }
    return None<T>();
  });
}
