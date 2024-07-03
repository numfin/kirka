import test from "ava";
import { useSpy } from "../../testutils/spy.js";
import { Err, Ok } from "../../index.js";
import { inspectErr } from "./inspectErr.js";

test(`.inspectErr()`, (t) => {
  const spyA = useSpy((v) => {});
  Ok(3).do(inspectErr(spyA.spy));
  t.is(spyA.calledTimes(), 0);

  const spyB = useSpy((v) => {});
  Err(4).do(inspectErr(spyB.spy));
  t.is(spyB.calledTimes(), 1);
  t.deepEqual(spyB.calledWith(0), [4]);
});
