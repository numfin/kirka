import { createRemapper } from "../middleware/remap.js";
export function cycle() {
    return createRemapper(function* (_, source) {
        let iter = source();
        const firstValue = iter.next();
        if (firstValue.done)
            return;
        yield firstValue.value;
        while (true) {
            const nextValue = iter.next();
            if (nextValue.done) {
                iter = source();
            }
            else {
                yield nextValue.value;
            }
        }
    });
}
