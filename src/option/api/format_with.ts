import { Display } from "../../traits/display.js";
import { createAggregator } from "../middleware/aggregate.js";
import { isSome } from "./is_some.js";

export function formatWith<T>(formatter: (value: T) => Display) {
  return createAggregator<T, string>((_, inner) => {
    return isSome(inner) ? `Some(${formatter(inner.value)})` : `None`;
  });
}
