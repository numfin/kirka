import test from "ava";
import { Err, Ok } from "../../index.js";
import { mapErr } from "./mapErr.js";
test(`.mapErr()`, (t) => {
    t.true(Ok(3)
        .do(mapErr((v) => v * 2))
        .eq(Ok(3)));
    t.true(Err(3)
        .do(mapErr((err) => err * 2))
        .eq(Err(6)));
});
