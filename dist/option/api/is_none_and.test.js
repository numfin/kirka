import test from "ava";
import { NewOption } from "../../index.js";
import { isNoneAnd } from "./is_none_and.js";
test(`Some.isNoneAnd() always false`, (t) => {
    const option = NewOption.Some(5);
    t.false(option.do(isNoneAnd(() => true)));
    t.false(option.do(isNoneAnd(() => false)));
});
test(`None.isNoneAnd() true if condition is true`, (t) => {
    const option = NewOption.None();
    t.true(option.do(isNoneAnd(() => true)));
    t.false(option.do(isNoneAnd(() => false)));
});
