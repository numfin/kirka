import test from "ava";
import { useSpy } from "../../testutils/spy.js";
import { Err, Ok } from "../../index.js";
import { inspect } from "./inspect.js";
test(`.inspect()`, (t) => {
    const spyA = useSpy((v) => { });
    Err(3).do(inspect(spyA.spy));
    t.is(spyA.calledTimes(), 0);
    const spyB = useSpy((v) => { });
    Ok(4).do(inspect(spyB.spy));
    t.is(spyB.calledTimes(), 1);
    t.deepEqual(spyB.calledWith(0), [4]);
});
