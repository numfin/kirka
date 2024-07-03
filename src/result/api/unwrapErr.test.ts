import test from "ava";
import { unwrapErr } from "./unwrapErr.js";
import { Err, Ok } from "../../index.js";

test(`.unwrapErr()`, (t) => {
  t.is(Err(3).do(unwrapErr()), 3);
  t.throws(() => Ok(3).do(unwrapErr()));
});
