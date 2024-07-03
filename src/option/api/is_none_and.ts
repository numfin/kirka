import { createAggregator } from "../middleware/aggregate.js";
import { isNone } from "./is_none.js";

export function isNoneAnd<T>(fn: () => boolean) {
  return createAggregator<T, boolean>((_, inner) => {
    return isNone(inner) && fn();
  });
}
