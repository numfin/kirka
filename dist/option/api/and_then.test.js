import test from "ava";
import { NewOption } from "../../index.js";
import { andThen } from "./and_then.js";
import { eq } from "./eq.js";
import { useSpy } from "../../testutils/spy.js";
test(`Some.andThen() should be Some(y) only when both result in Some`, (t) => {
    const s = NewOption.Some(4);
    const s2 = NewOption.Some(5);
    const s3 = NewOption.Some(10);
    t.is(s.do(andThen((_) => s2)).unwrap(), 5);
    t.is(s
        .do(andThen((_) => s2))
        .do(andThen((_) => s3))
        .unwrap(), 10);
});
test(`x.and(y) should be None when one of them is None`, (t) => {
    const s = NewOption.Some(4);
    const s2 = NewOption.Some(5);
    const n = NewOption.None();
    t.true(s.do(andThen((_) => n)).do(eq(NewOption.None())));
    t.true(n.do(andThen((_) => s)).do(eq(NewOption.None())));
    t.true(n
        .do(andThen((_) => s))
        .do(andThen((_) => s2))
        .do(eq(NewOption.None())));
});
test(`Some(x).andThen(fn) fn should be called with x`, (t) => {
    const s = NewOption.Some(4);
    const spy1 = useSpy((v) => NewOption.Some(5 + v));
    const spy2 = useSpy((v) => NewOption.Some(10 + v));
    t.is(s.do(andThen(spy1.spy)).do(andThen(spy2.spy)).unwrap(), 19);
    t.deepEqual(spy1.calledWith(0), [4]);
    t.deepEqual(spy2.calledWith(0), [9]);
});
