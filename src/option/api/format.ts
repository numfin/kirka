import { Display } from "../../traits/display.js";
import { createAggregator } from "../middleware/aggregate.js";
import { isSome } from "./is_some.js";

export function format<T extends Display>() {
  return createAggregator<T, string>((_, inner) => {
    return isSome(inner) ? `Some(${inner.value})` : `None`;
  });
}
