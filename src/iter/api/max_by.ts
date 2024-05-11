import { None, Some } from "../../option/index.js";
import { Option } from "../../option/interfaces.js";
import { createAggregator } from "../middleware/aggregate.js";

export function maxBy<T>(cmpFn: (item: T) => number) {
  return createAggregator<T, Option<T>>((_, source) => {
    let max = None<T>();
    for (const nextMax of source()) {
      max = max
        .map((currentMax) => {
          const nextBigger = cmpFn(nextMax) > cmpFn(currentMax);
          return nextBigger ? nextMax : currentMax;
        })
        .or(Some(nextMax));
    }
    return max;
  });
}
