import { iterFactory, iterInfinite } from "./gen";
import { create_iter } from "./iter";
export var IterFrom;
(function (IterFrom) {
    function array(source) {
        return create_iter(() => iterFactory(source));
    }
    IterFrom.array = array;
    function range(from, to, inclusive = false) {
        if (from > to) {
            throw new Error(`Invalid range: From(${from}) > To(${to})`);
        }
        const extra = inclusive ? 1 : 0;
        return create_iter(() => iterInfinite())
            .take(to - from + extra)
            .enumerate()
            .map(({ index }) => index + from);
    }
    IterFrom.range = range;
})(IterFrom || (IterFrom = {}));
