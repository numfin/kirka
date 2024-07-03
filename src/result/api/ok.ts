import { NewOption } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { isOk } from "./isOk.js";

export function ok<T>() {
  return createAggregator<T, unknown, NewOption<T>>((_, inner) => {
    return isOk(inner) ? NewOption.Some(inner.value) : NewOption.None();
  });
}
