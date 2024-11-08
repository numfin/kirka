import test from "ava";
import { Iter } from "../index.js";
import { nativeRange } from "../iter-test-tools.js";
import { skip } from "./skip.js";
import { toArray } from "./to_array.js";
test(`skip() should skip amount of items`, (t) => {
    const iter = Iter.fromRange(3, 10);
    const values = nativeRange(3, 10);
    // Clone test: initial iter should be untouched
    const skippedIter = iter.do(skip(3));
    const skippedValues = values.slice(3);
    t.deepEqual(iter.do(toArray()), values);
    t.deepEqual(skippedIter.do(toArray()), skippedValues);
});
test(`skip() should work with empty iter`, (t) => {
    t.deepEqual(Iter.from([]).do(skip(3)).do(toArray()), []);
});
