import { iterFactory, iterInfinite } from "./gen";
import { createIter } from "./iter";
export var IterFrom;
(function (IterFrom) {
    function iterable(source) {
        return createIter(() => iterFactory(source));
    }
    IterFrom.iterable = iterable;
    function array(source) {
        return iterable(source);
    }
    IterFrom.array = array;
    function range(from, to, inclusive = false) {
        if (from > to) {
            throw new Error(`Invalid range: From(${from}) > To(${to})`);
        }
        const extra = inclusive ? 1 : 0;
        return createIter(() => iterInfinite())
            .take(to - from + extra)
            .enumerate()
            .map(({ index }) => index + from);
    }
    IterFrom.range = range;
})(IterFrom || (IterFrom = {}));
