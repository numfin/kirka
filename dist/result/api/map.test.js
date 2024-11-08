import test from "ava";
import { Err, Ok } from "../../index.js";
import { map } from "./map.js";
test(`.map()`, (t) => {
    t.true(Err(3)
        .do(map((v) => v * 2))
        .eq(Err(3)));
    t.true(Ok(3)
        .do(map((_) => "value"))
        .eq(Ok("value")));
});
