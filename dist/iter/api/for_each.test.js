import test from "ava";
import { useSpy } from "../../testutils/spy.js";
import { Iter } from "../index.js";
import { forEach } from "./for_each.js";
import { nativeRange } from "../iter-test-tools.js";
test(`forEach() should iterate through all values`, (t) => {
    const myFn = useSpy(() => { });
    const iter = Iter.fromRange(0, 10);
    iter.do(forEach(myFn.spy));
    t.is(myFn.calledTimes(), 10);
    for (const i of nativeRange(0, 10)) {
        t.deepEqual(myFn.calledWith(i), [i]);
    }
});
test(`forEach() should not return any value`, (t) => {
    t.is(Iter.fromRange(0, 10).do(forEach(() => 3)), undefined);
});
