import { NewOption } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { isErr } from "./isErr.js";

export function err<E>() {
  return createAggregator<unknown, E, NewOption<E>>((_, inner) => {
    return isErr(inner) ? NewOption.Some(inner.err) : NewOption.None();
  });
}
