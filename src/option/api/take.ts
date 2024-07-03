import { NewOption } from "../../index.js";
import { None } from "../base.js";
import { createAggregator } from "../middleware/aggregate.js";
import { isSome } from "./is_some.js";

export function take<T>() {
  return createAggregator<T, NewOption<T>>((option, inner) => {
    if (isSome(inner)) {
      const value = inner.value;
      (option.inner as unknown) = None;
      return NewOption.Some(value);
    }
    return NewOption.None<T>();
  });
}
