import test from "ava";
import { Iter } from "../index.js";
import { nativeRange } from "../iter-test-tools.js";
import { filterMap } from "./filter_map.js";
import { NewOption } from "../../option/index.js";
test(`.filterMap()`, (t) => {
    const evenValues = nativeRange(0, 10).filter((v) => v % 2 === 0);
    const oddValues = nativeRange(0, 10).filter((v) => v % 2 !== 0);
    const iter = Iter.fromRange(0, 10);
    function even(v) {
        return v % 2 === 0 ? NewOption.Some(v) : NewOption.None();
    }
    function odd(v) {
        return v % 2 !== 0 ? NewOption.Some(v) : NewOption.None();
    }
    // Clone test: initial iter should be untouched
    const evenIter = iter.do(filterMap(even));
    const oddIter = iter.do(filterMap(odd));
    t.deepEqual([...evenIter], evenValues);
    t.deepEqual([...oddIter], oddValues);
});
