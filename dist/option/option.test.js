import test from "ava";
import { NewOption } from "./index.js";
test(`Option.clone()`, (t) => {
    const option = NewOption.Some(3);
    const clonedOption = option.clone();
    t.not(option.inner, clonedOption.inner);
    t.deepEqual(option.inner, clonedOption.inner);
});
test(`Option.[Symbol.iterator]()`, (t) => {
    const opt = NewOption.Some("v");
    t.deepEqual(Array.from(opt), ["v"]);
    t.deepEqual(Array.from(opt), ["v"]);
    t.deepEqual(Array.from(NewOption.None()), []);
});
test(`Option.fromBool()`, (t) => {
    t.is(NewOption.fromBool(true).unwrap(), true);
    t.true(NewOption.fromBool(false).isNone());
});
test(`Option.fromNullable()`, (t) => {
    t.true(NewOption.fromNullable(null).isNone());
    t.true(NewOption.fromNullable(undefined).isNone());
    t.is(NewOption.fromNullable(3).unwrap(), 3);
});
