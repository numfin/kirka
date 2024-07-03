import { map } from "../../option/api/map.js";
import { or } from "../../option/api/or.js";
import { NewOption } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";

export function minBy<T>(cmpFn: (item: T) => number) {
  return createAggregator<T, NewOption<T>>((_, source) => {
    let min = NewOption.None<T>();
    for (const nextMin of source()) {
      min = min
        .do(
          map((currentMin) => {
            const nextSmaller = cmpFn(nextMin) < cmpFn(currentMin);
            return nextSmaller ? nextMin : currentMin;
          })
        )
        .do(or(NewOption.Some(nextMin)));
    }
    return min;
  });
}
