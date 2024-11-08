import test from "ava";
import { Err, Ok } from "../../index.js";
import { match } from "./match.js";
test(`.match()`, (t) => {
    t.is(Ok("v").do(match((v) => v, (e) => e)), "v");
    t.is(Err("e").do(match((v) => v, (e) => e)), "e");
});
