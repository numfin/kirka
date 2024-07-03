import { NewOption } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { filterMap } from "./filter_map.js";

export function findMap<T, U>(fn: (item: T) => NewOption<U>) {
  return createAggregator<T, NewOption<U>>((iter) => {
    return iter.do(filterMap(fn)).next();
  });
}
