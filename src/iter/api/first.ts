import { NewOption } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";

export function first<T>() {
  return createAggregator<T, NewOption<T>>((_, source) => {
    for (const item of source()) {
      return NewOption.Some(item);
    }
    return NewOption.None<T>();
  });
}
