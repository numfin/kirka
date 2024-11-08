import test from "ava";
import { Iter } from "../index.js";
import { toSet } from "./to_set.js";
test("toSet() converts iterator to Set<T>", (t) => {
    const iter = Iter.from([1, 2, 3]);
    t.deepEqual(iter.do(toSet()), new Set([1, 2, 3]));
});
test("toSet() empty iter to empty Set", (t) => {
    const iter = Iter.from([]);
    t.deepEqual(iter.do(toSet()), new Set());
});
