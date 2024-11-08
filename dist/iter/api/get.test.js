import test from "ava";
import { Iter } from "../index.js";
import { get } from "./get.js";
import { NewOption } from "../../option/index.js";
test(`get() should return element under index`, (t) => {
    const iter = Iter.fromRange(0, 10);
    t.true(iter.do(get(0)).eq(NewOption.Some(0)));
    t.true(iter.do(get(1)).eq(NewOption.Some(1)));
    t.true(iter.do(get(2)).eq(NewOption.Some(2)));
});
test(`get() should return none on negative index`, (t) => {
    const iter = Iter.fromRange(0, 10);
    t.true(iter.do(get(-1)).isNone());
});
test(`get() should return none when out of bounds`, (t) => {
    const iter = Iter.fromRange(0, 10);
    t.true(iter.do(get(100)).isNone());
});
test(`get() should retrieve same element when called several tames`, (t) => {
    const iter = Iter.fromRange(0, 10);
    t.true(iter.do(get(2)).eq(NewOption.Some(2)));
    t.true(iter.do(get(2)).eq(NewOption.Some(2)));
    t.true(iter.do(get(2)).eq(NewOption.Some(2)));
});
