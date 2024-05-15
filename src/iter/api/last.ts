import { None, Option, Some } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { fold } from "./fold.js";

export function last<T>() {
  return createAggregator<T, Option<T>>((iter) => {
    return iter.do(fold(None<T>(), (_, item) => Some(item)));
  });
}
