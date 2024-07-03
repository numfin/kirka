import { NewOption } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { first } from "./first.js";
import { skip } from "./skip.js";

export function get<T>(index: number) {
  return createAggregator<T, NewOption<T>>((iter) => {
    if (index < 0) {
      return NewOption.None<T>();
    }
    return iter.do(skip(index)).do(first());
  });
}
