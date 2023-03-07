export const defaultFilter = (item) => true;
export const defaultMap = (item) => item;
export const iterFactory = function* (source, map = (defaultMap), filter = (defaultFilter)) {
    const check = (item) => filter(item);
    for (const item of source) {
        const mappedItem = map(item);
        if (check(mappedItem)) {
            yield mappedItem;
        }
    }
};
