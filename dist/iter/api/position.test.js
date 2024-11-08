import test from "ava";
import { Iter } from "../index.js";
import { position } from "./position.js";
test(`position() should return index of found element`, (t) => {
    const iter = Iter.fromRange(0, 10);
    t.is(iter.do(position((v) => v === 5)).unwrap(), 5);
});
test(`position() should return none if element not found`, (t) => {
    const iter = Iter.fromRange(0, 10);
    t.true(iter.do(position((v) => v === 100)).isNone());
});
