import test from "ava";
import { Iter } from "../index.js";
import { last } from "./last.js";
import { NewOption } from "../../option/index.js";
test(`last() should return last element`, (t) => {
    t.true(Iter.from([1, 2, 3]).do(last()).eq(NewOption.Some(3)));
});
test(`last() should return none on empty iter`, (t) => {
    t.true(Iter.from([]).do(last()).isNone());
});
