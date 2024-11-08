import test from "ava";
import { Err, Ok, ResultNew } from "../../index.js";
import { and } from "./and.js";
test(`Ok(v).and()`, (t) => {
    const ok = ResultNew.Ok(4);
    const ok2 = ResultNew.Ok(6);
    const err = ResultNew.Err(8);
    t.true(ok.do(and(err)).isErr());
    t.is(ok.do(and(ok2)).unwrap(), ok2.unwrap());
});
test(`Err(v).and()`, (t) => {
    const err1 = Err(3);
    const err2 = Err(5);
    const ok = Ok(6);
    const t1 = err1.do(and(err2));
    t.true(t1.unwrapErr() === err1.unwrapErr());
    t.is(err1.do(and(ok)).unwrapErr(), err1.unwrapErr());
});
