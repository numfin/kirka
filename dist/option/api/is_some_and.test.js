import test from "ava";
import { NewOption } from "../../index.js";
import { isSomeAnd } from "./is_some_and.js";
test(`Some.isSomeAnd() true if condition is true`, (t) => {
    const option = NewOption.Some(5);
    t.true(option.do(isSomeAnd((v) => v === 5)));
    t.false(option.do(isSomeAnd((v) => v !== 5)));
});
test(`None.isSomeAnd() is always falsy`, (t) => {
    const option = NewOption.None();
    t.false(option.do(isSomeAnd((_) => true)));
    t.false(option.do(isSomeAnd((_) => false)));
});
