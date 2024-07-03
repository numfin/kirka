import { map } from "../../option/api/map.js";
import { NewOption } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { enumerate } from "./enumerate.js";
import { find } from "./find.js";

export function position<T>(condition: (item: T) => boolean) {
  return createAggregator<T, NewOption<number>>((iter) => {
    return iter
      .do(enumerate())
      .do(find(({ item }) => condition(item)))
      .do(map(({ index }) => index));
  });
}
