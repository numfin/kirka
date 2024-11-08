import test from "ava";
import { Iter } from "../index.js";
import { stepBy } from "./step_by.js";
import { toArray } from "./to_array.js";
import { nativeRange } from "../iter-test-tools.js";
test(`stepBy(n) throws if n < 1`, (t) => {
    const iter = Iter.fromRange(1, 11, true);
    t.throws(() => iter.do(stepBy(0)));
});
test(`stepBy(n) skips n elements per iteration`, (t) => {
    const iter = Iter.fromRange(1, 11, true);
    t.deepEqual(iter.do(stepBy(1)).do(toArray()), nativeRange(1, 11, true));
    t.deepEqual(iter.do(stepBy(2)).do(toArray()), [1, 3, 5, 7, 9, 11]);
    t.deepEqual(iter.do(stepBy(3)).do(toArray()), [1, 4, 7, 10]);
    t.deepEqual(iter.do(stepBy(4)).do(toArray()), [1, 5, 9]);
    t.deepEqual(iter.do(stepBy(5)).do(toArray()), [1, 6, 11]);
    t.deepEqual(iter.do(stepBy(6)).do(toArray()), [1, 7]);
    t.deepEqual(iter.do(stepBy(7)).do(toArray()), [1, 8]);
    t.deepEqual(iter.do(stepBy(8)).do(toArray()), [1, 9]);
    t.deepEqual(iter.do(stepBy(9)).do(toArray()), [1, 10]);
    t.deepEqual(iter.do(stepBy(10)).do(toArray()), [1, 11]);
    t.deepEqual(iter.do(stepBy(11)).do(toArray()), [1]);
});
test(`stepBy() works with empty iter`, (t) => {
    t.deepEqual(Iter.from([]).do(stepBy(1)).do(toArray()), []);
});
