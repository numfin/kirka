import test from "ava";
import { Err, Ok } from "../../index.js";
import { orElse } from "./orElse.js";
test(`Ok().orElse()`, (t) => {
    const rok = Ok(3);
    // notice we changed type of Err() from number to string
    t.true(rok.do(orElse((e) => Ok(e * 2))).eq(Ok(3)));
    t.true(rok.do(orElse((e) => Err(e * 2))).eq(Ok(3)));
});
test(`Err().orElse()`, (t) => {
    const rerr = Err(4);
    t.true(rerr.do(orElse((e) => Ok(e * 2))).eq(Ok(8)));
    t.true(rerr.do(orElse((e) => Err(e * 2))).eq(Err(8)));
});
