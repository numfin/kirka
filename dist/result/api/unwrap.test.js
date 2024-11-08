import test from "ava";
import { Err, Ok } from "../../index.js";
import { unwrap } from "./unwrap.js";
test(`.unwrap()`, (t) => {
    t.is(Ok(3).do(unwrap()), 3);
    t.throws(() => Err(3).do(unwrap()));
});
