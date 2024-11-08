import test from "ava";
import { Iter } from "../index.js";
import { toArray } from "./to_array.js";
test("toArray() converts iterator to T[]", (t) => {
    const iter = Iter.from([1, 2, 3]);
    t.deepEqual(iter.do(toArray()), [1, 2, 3]);
});
test("toArray() empty iter to empty array", (t) => {
    const iter = Iter.from([]);
    t.deepEqual(iter.do(toArray()), []);
});
