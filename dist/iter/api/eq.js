import { IterFrom } from "../from/index.js";
export function eq(source, another, by) {
    const sourceIter = source.recreate();
    const anotherIter = IterFrom.iterable(another);
    while (true) {
        const sourceNext = sourceIter.next();
        const anotherNext = anotherIter.next();
        if (sourceNext.isSome() || anotherNext.isSome()) {
            if (!sourceNext.eq(anotherNext, by)) {
                return false;
            }
        }
        else {
            return true;
        }
    }
}
