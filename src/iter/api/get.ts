import { None, Option } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { first } from "./first.js";
import { skip } from "./skip.js";

export function get<T>(index: number) {
  return createAggregator<T, Option<T>>((iter) => {
    if (index < 0) {
      return None<T>();
    }
    return iter.do(skip(index)).do(first());
  });
}
