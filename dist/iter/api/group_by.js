import { createAggregator } from "../middleware/aggregate.js";
export function groupBy(keyExtractor) {
    return createAggregator((_, source) => {
        const groups = new Map();
        for (const item of source()) {
            const key = keyExtractor(item);
            const group = groups.get(key);
            if (Array.isArray(group)) {
                group.push(item);
            }
            else {
                groups.set(key, [item]);
            }
        }
        return groups;
    });
}
