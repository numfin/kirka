import test from "ava";
import { Err, Ok } from "../../index.js";
import { unwrapOr } from "./unwrapOr.js";
test(`Err().unwrapOr()`, (t) => {
    t.is(Err(3).do(unwrapOr("hi")), "hi");
});
test(`Ok().unwrapOr()`, (t) => {
    t.is(Ok(3).do(unwrapOr(5)), 3);
});
