import test from "ava";
import { Err, Ok } from "../../index.js";
import { eq } from "./eq.js";
test(`x.eq(y) when x == y`, (t) => {
    t.true(Err(3).do(eq(Err(3))));
    t.false(Err(3).do(eq(Ok(3))));
    t.true(Ok(4).do(eq(Ok(4))));
    t.false(Ok(4).do(eq(Err(4))));
});
test(`x.eq(y) when x != y`, (t) => {
    t.false(Err(3).do(eq(Err(4))));
    t.false(Err(3).do(eq(Ok(4))));
    t.false(Ok(4).do(eq(Ok(3))));
    t.false(Ok(4).do(eq(Err(3))));
});
