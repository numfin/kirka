import { map } from "../../option/api/map.js";
import { createAggregator } from "../middleware/aggregate.js";
import { enumerate } from "./enumerate.js";
import { find } from "./find.js";
export function position(condition) {
    return createAggregator((iter) => {
        return iter
            .do(enumerate())
            .do(find(({ item }) => condition(item)))
            .do(map(({ index }) => index));
    });
}
