import test from "ava";
import { NewOption } from "../../index.js";
import { map } from "./map.js";
test(`Some.map() remaps inner value`, (t) => {
    const x2 = map((v) => v * 2);
    const optionSome = NewOption.Some(5).do(x2);
    t.is(optionSome.unwrap(), 10);
    const mappedTwice = optionSome.do(x2);
    t.is(mappedTwice.unwrap(), 20);
});
test(`None.map() remains None`, (t) => {
    const x2 = map((v) => v * 2);
    const optionSome = NewOption.None().do(x2);
    t.true(optionSome.isNone());
    const mappedTwice = optionSome.do(x2);
    t.true(mappedTwice.isNone());
});
