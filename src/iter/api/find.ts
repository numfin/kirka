import { Option } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { skipWhile } from "./skip_while.js";

export function find<T>(fn: (item: T) => boolean) {
  return createAggregator<T, Option<T>>((iter) => {
    return iter.do(skipWhile((item) => !fn(item))).next();
  });
}
