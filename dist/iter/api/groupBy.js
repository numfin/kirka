export function groupBy(source, fn) {
    const groups = new Map();
    for (const item of source) {
        const key = fn(item);
        const group = groups.get(key);
        if (Array.isArray(group)) {
            group.push(item);
        }
        else {
            groups.set(key, [item]);
        }
    }
    return groups;
}
