import test from "ava";
import { NewOption } from "../../index.js";
import { filter } from "./filter.js";
import { eq } from "./eq.js";
test(`Some(x).filter() if condition is true then Some(x) or None`, (t) => {
    const s = NewOption.Some(3);
    t.truthy(s.do(filter((v) => v === 3)).do(eq(NewOption.Some(3))));
    t.truthy(s.do(filter((_) => false)).isNone());
});
test(`None.filter() always None`, (t) => {
    const n = NewOption.None();
    t.truthy(n.do(filter((_) => true)).isNone());
});
