import test from "ava";
import { Err, Ok } from "../../index.js";
import { isErrAnd } from "./isErrAnd.js";
test(`.isErrAnd()`, (t) => {
    t.false(Ok(3).do(isErrAnd((v) => true)));
    t.false(Ok(3).do(isErrAnd((v) => false)));
    t.true(Err(3).do(isErrAnd((v) => true)));
    t.false(Err(3).do(isErrAnd((v) => false)));
});
