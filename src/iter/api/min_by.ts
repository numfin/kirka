import { None, Some } from "../../option/index.js";
import { Option } from "../../option/interfaces.js";
import { createAggregator } from "../middleware/aggregate.js";

export function minBy<T>(cmpFn: (item: T) => number) {
  return createAggregator<T, Option<T>>((_, source) => {
    let min = None<T>();
    for (const nextMin of source()) {
      min = min
        .map((currentMin) => {
          const nextSmaller = cmpFn(nextMin) < cmpFn(currentMin);
          return nextSmaller ? nextMin : currentMin;
        })
        .or(Some(nextMin));
    }
    return min;
  });
}
