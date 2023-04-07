import { defaultMap } from "./defaultMap.js";
import { defaultFilter } from "./defaultFilter.js";
export function* iterFactory(source, map = (defaultMap), filter = (defaultFilter)) {
    const check = (item) => filter(item);
    for (const item of source) {
        const mappedItem = map(item);
        if (check(mappedItem)) {
            yield mappedItem;
        }
    }
}
