import { NewOption } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { fold } from "./fold.js";

export function last<T>() {
  return createAggregator<T, NewOption<T>>((iter) => {
    return iter.do(
      fold(NewOption.None<T>(), (_, item) => NewOption.Some(item))
    );
  });
}
