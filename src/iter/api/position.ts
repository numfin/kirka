import { Option } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { enumerate } from "./enumerate.js";
import { find } from "./find.js";

export function position<T>(condition: (item: T) => boolean) {
  return createAggregator<T, Option<number>>((iter) => {
    return iter
      .do(enumerate())
      .do(find(({ item }) => condition(item)))
      .map(({ index }) => index);
  });
}
