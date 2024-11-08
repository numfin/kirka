import test from "ava";
import { Iter } from "../index.js";
import { intersperse } from "./intersperse.js";
import { toArray } from "./to_array.js";
test(`intersperse(value) should put value between iter elements`, (t) => {
    t.deepEqual(Iter.from([1, 2, 3]).do(intersperse(10)).do(toArray()), [1, 10, 2, 10, 3]);
    t.deepEqual(Iter.from([1, 2]).do(intersperse(10)).do(toArray()), [1, 10, 2]);
});
test(`intersperse(value) should not put value when one element`, (t) => {
    const iter = Iter.from([1]);
    t.deepEqual(iter.do(intersperse(10)).do(toArray()), [1]);
});
test(`intersperse(value) should put value on empty iter`, (t) => {
    const iter = Iter.from([]);
    t.deepEqual(iter.do(intersperse(10)).do(toArray()), []);
});
