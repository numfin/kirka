import test from "ava";
import { Iter } from "../index.js";
import { toArray } from "./to_array.js";
import { flatten } from "./flatten.js";
test(`flatten() flattens inner iterable`, (t) => {
    const iter = Iter.from([[1], [2], [3]]);
    t.deepEqual(iter.do(flatten()).do(toArray()), [1, 2, 3]);
});
test(`flatten() flattens inner Iter`, (t) => {
    const iter = Iter.from([[1], [2], [3]]).do(Iter.from);
    t.deepEqual(iter.do(flatten()).do(toArray()), [1, 2, 3]);
});
test(`flatten() works on empty iters`, (t) => {
    const iter = Iter.from([[1], [], [3]]);
    t.deepEqual(iter.do(flatten()).do(toArray()), [1, 3]);
});
test(`flatten() typecheck: should work only on Iter<Iterable<T>>`, (t) => {
    const iter = Iter.from([[1], 2, [3]]);
    // @ts-expect-error
    iter.do(flatten());
    t.pass();
});
