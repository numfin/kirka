import { IterFrom } from "../from";
export function partition(source, fn) {
    const iterA = [];
    const iterB = [];
    for (const item of source) {
        if (fn(item)) {
            iterA.push(item);
        }
        else {
            iterB.push(item);
        }
    }
    return [IterFrom.array(iterA), IterFrom.array(iterB)];
}
