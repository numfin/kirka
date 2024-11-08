import test from "ava";
import { NewOption } from "../../index.js";
import { orElse } from "./or_else.js";
test(`Some.orElse()`, (t) => {
    const option = NewOption.Some(1);
    const orSix = orElse(() => NewOption.Some(6));
    const orTen = orElse(() => NewOption.Some(10));
    t.is(option.do(orSix).unwrap(), 1);
    t.is(option.do(orSix).do(orTen).unwrap(), 1);
    t.is(option.do(orElse(NewOption.None)).unwrap(), 1);
});
test(`None.orElse()`, (t) => {
    const option = NewOption.None();
    const orSix = orElse(() => NewOption.Some(6));
    const orTen = orElse(() => NewOption.Some(10));
    t.is(option.do(orSix).unwrap(), 6);
    t.is(option.do(orSix).do(orTen).unwrap(), 6);
    t.true(option.do(orElse(NewOption.None)).isNone());
});
