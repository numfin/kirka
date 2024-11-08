import test from "ava";
import { Iter } from "../index.js";
import { nthMut } from "./nth_mut.js";
import { NewOption } from "../../option/index.js";
test(`nth(0) iterates by 1 element and mutates original iterator`, (t) => {
    const iter = Iter.fromRange(0, 4);
    t.true(iter.do(nthMut(0)).eq(NewOption.Some(0)));
    t.true(iter.do(nthMut(0)).eq(NewOption.Some(1)));
    t.true(iter.do(nthMut(0)).eq(NewOption.Some(2)));
    t.true(iter.do(nthMut(0)).eq(NewOption.Some(3)));
    t.true(iter.do(nthMut(0)).isNone());
});
test(`nth(n) throws when n < 0`, (t) => {
    const iter = Iter.fromRange(0, 4);
    t.throws(() => iter.do(nthMut(-1)));
});
test(`nth(n) gives n element discarding prev values`, (t) => {
    const iter = Iter.fromRange(0, 4);
    t.is(iter.do(nthMut(2)).unwrap(), 2); // [0, 1, >2, 3]
    t.true(iter.do(nthMut(2)).isNone()); // [0, 1, 2, 3, _, >_]
});
