import test from "ava";
import { NewOption } from "../../index.js";
import { and } from "./and.js";
import { eq } from "./eq.js";
test(`x.and(y) should be Some(y) only when both Some`, (t) => {
    const s = NewOption.Some(4);
    const s2 = NewOption.Some(5);
    const s3 = NewOption.Some(10);
    t.is(s.do(and(s2)).unwrap(), 5);
    t.is(s.do(and(s2)).do(and(s3)).unwrap(), 10);
});
test(`x.and(y) should be None when one of them is None`, (t) => {
    const s = NewOption.Some(4);
    const s2 = NewOption.Some(5);
    const n = NewOption.None();
    t.true(s.do(and(n)).do(eq(NewOption.None())));
    t.true(n.do(and(s)).do(eq(NewOption.None())));
    t.true(n.do(and(s)).do(and(s2)).do(eq(NewOption.None())));
});
