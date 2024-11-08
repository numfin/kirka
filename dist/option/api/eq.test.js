import test from "ava";
import { NewOption } from "../../index.js";
import { eq } from "./eq.js";
test(`eq() truthy when values equal`, (t) => {
    const s = NewOption.Some(3);
    const s2 = NewOption.Some(3);
    const n = NewOption.None();
    const n2 = NewOption.None();
    t.true(s.do(eq(s2)));
    t.true(n.do(eq(n2)));
    // typescript allows us to cast
    // None<number> to None<unknown>
    // but not
    // None<unknown> to None<number>
    // @ts-expect-error
    n2.do(eq(n));
});
test(`eq() falsy when values not equal`, (t) => {
    const s = NewOption.Some(3);
    const s2 = NewOption.Some(4);
    const n = NewOption.None();
    const n2 = NewOption.None();
    t.false(s.do(eq(s2)));
    t.false(s.do(eq(n)));
    t.false(n.do(eq(s)));
    // @ts-expect-error
    n2.do(eq(n));
});
test(`eq(by) truthy when mapped values equal`, (t) => {
    const s = NewOption.Some({ x: 3 });
    const s2 = NewOption.Some({ x: 3 });
    const s3 = NewOption.Some({ x: 4 });
    t.truthy(s.do(eq(s2, (v) => v.x)));
    t.truthy(s.do(eq(s3, (_) => 10)));
    t.truthy(s3.do(eq(s, (_) => 10)));
});
test(`eq(by) falsy when mapped values not equal`, (t) => {
    const s = NewOption.Some({ x: 3 });
    const s2 = NewOption.Some({ x: 4 });
    const n = NewOption.None();
    t.falsy(s.do(eq(s2, (v) => v.x)));
    t.falsy(s.do(eq(s, (_) => Math.random())));
    // Even if mapped value is 10 both for Some and None
    // they are still not equal
    t.falsy(s.do(eq(n, (_) => 10)));
});
