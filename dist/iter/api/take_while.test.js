import test from "ava";
import { nativeRange } from "../iter-test-tools.js";
import { useSpy } from "../../testutils/spy.js";
import { Iter } from "../index.js";
import { takeWhile } from "./take_while.js";
import { toArray } from "./to_array.js";
function testTakeWhile(t, [from, to], condition) {
    // Repeat range twice to test that we not taking values twice
    const values = [
        ...nativeRange(from, to, true),
        ...nativeRange(from, to, true),
    ];
    // Kirka take
    const spyFilter = useSpy(condition);
    const iter = Iter.from(values);
    // Clone test: initial iter should be untouched
    const skippedIter = iter.do(takeWhile(spyFilter.spy));
    // Native take
    let foundInvalid = false;
    const takenValues = values.filter((item) => {
        if (foundInvalid)
            return false;
        foundInvalid = !condition(item);
        return !foundInvalid;
    });
    t.deepEqual(iter.do(toArray()), values);
    t.deepEqual(skippedIter.do(toArray()), takenValues);
    t.is(spyFilter.calledTimes(), Math.min(takenValues.length + 1, values.length));
}
test(`.takeWhile()`, (t) => {
    testTakeWhile(t, [1, 5], (item) => item !== 3);
    testTakeWhile(t, [1, 5], () => true); // take all
    testTakeWhile(t, [1, 5], () => false); // take none
});
